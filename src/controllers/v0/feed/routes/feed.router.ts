import { Router, Request, Response } from 'express';
import { FeedItem } from '../models/FeedItem';
import { requireAuth } from '../../users/routes/auth.router';
import * as AWS from '../../../../aws';

const router: Router = Router();

// Get all feed items
// '/' root is /api/v0/feed/routes
router.get('/', async (req: Request, res: Response) => {
  // how do we collect feed items?
  // local variables to store all FeedItems using sequelize interface
    const items = await FeedItem.findAndCountAll({order: [['id', 'DESC']]});
    // map and make item url into signedUrl
    // take key from our database, and get a signedUrl from S3, so we can access resource directly
    items.rows.map((item) => {
            if(item.url) {
                item.url = AWS.getGetSignedUrl(item.url);
            }
    });
    // send items back to client
    res.send(items);
});

//@TODO
//Add an endpoint to GET a specific resource by Primary Key

//create an endpoint to GET a record using its ID field
//find the record, check that it has an ID field, return
router.get('/:id', async (req: Request, res: Response) => {
  let {id} = req.params;

  const result = await FeedItem.findOne({ where: {id: id}});
  res.send(result);
});


//Patch data (update existing record in the database)
// update a specific resource
router.patch('/:id',
    requireAuth,
    async (req: Request, res: Response) => {
        //@TODO try it yourself
        let {id} = req.params;
        const caption = req.body.caption;
        const url = req.body.url;

        if (!id) {
          return res.status(400).send(`an ID is required`);
        }

        await FeedItem.update({caption: caption, url: url}, {
          where: {id: id}
        });
        res.status(204).send("resource updated");

        // res.send(500).send("not implemented")
});


// Get a signed url to put a new item in the bucket
// similar to above. request specific signedUrl specifically for the file we are going to upload
router.get('/signed-url/:fileName',
    requireAuth,
    async (req: Request, res: Response) => {
    let { fileName } = req.params;
    const url = AWS.getPutSignedUrl(fileName);
    res.status(201).send({url: url});
});

// Post meta data and the filename after a file is uploaded
// NOTE the file name is they key name in the s3 bucket.
// body : {caption: string, fileName: string};
router.post('/',
    requireAuth,
    async (req: Request, res: Response) => {
    const caption = req.body.caption;
    const fileName = req.body.url;

    // check Caption is valid
    if (!caption) {
        return res.status(400).send({ message: 'Caption is required or malformed' });
    }

    // check Filename is valid
    if (!fileName) {
        return res.status(400).send({ message: 'File url is required' });
    }

// instantiate new FeedItem
    const item = await new FeedItem({
            caption: caption,
            url: fileName
    });

// save item to database
    const saved_item = await item.save();

    saved_item.url = AWS.getGetSignedUrl(saved_item.url);
    res.status(201).send(saved_item);
});

export const FeedRouter: Router = router;
