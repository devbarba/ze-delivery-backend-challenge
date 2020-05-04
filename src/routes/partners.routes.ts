import { Router, Request, Response } from 'express';
import PartnerController from '../controllers/PartnerController';
import ensureAuthenticated from '../middlewares/ensureAuthenticated';

const partnerController = new PartnerController();

const partnersRouter = Router();

partnersRouter.use(ensureAuthenticated);

partnersRouter.get('/:id', (request: Request, response: Response) => {
    partnerController.readPartner(request, response);
});

partnersRouter.get('/', (request: Request, response: Response) => {
    partnerController.readNerbyPartner(request, response);
});

partnersRouter.post('/', (request: Request, response: Response) => {
    partnerController.createPartner(request, response);
});

export default partnersRouter;
