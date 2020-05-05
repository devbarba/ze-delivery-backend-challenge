import { Router, Request, Response } from 'express';
import { check, validationResult } from 'express-validator';
import PartnerController from '../controllers/PartnerController';
import ensureAuthenticated from '../middlewares/ensureAuthenticated';
import dotenv from 'dotenv';

dotenv.config();
const partnerController = new PartnerController();

const partnersRouter = Router();

partnersRouter.use(ensureAuthenticated);

partnersRouter.get('/:id', (request: Request, response: Response) => {
    partnerController.readPartner(request, response);
});

partnersRouter.get('/', (request: Request, response: Response) => {
    partnerController.readNerbyPartner(request, response);
});

partnersRouter.post(
    '/',
    [
        check('tradingName').isString(),
        check('ownerName').isString(),
        check('document').isString(),
        check('coverageArea.type').isString(),
        check('coverageArea.coordinates').isArray(),
        check('address.type').isString(),
        check('address.coordinates').isArray(),
    ],
    (request: Request, response: Response) => {
        const errors = validationResult(request);
        if (!errors.isEmpty()) {
            return response.status(422).json({ errors: errors.array() });
        }

        partnerController.createPartner(request, response);
    }
);

export default partnersRouter;
