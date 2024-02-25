import { inject, injectable } from 'inversify';
import { Request, Response } from 'express';
import { BaseController, HttpError, HttpMethod } from '../../libs/rest/index.js';
import { Logger } from '../../libs/logger/index.js';
import { Component } from '../../types/index.js';
import { OfferService } from './offer-service.interface.js';
import { CommentService } from '../comment/comment-service.interface.js';
import { fillDTO } from '../../helpers/index.js';
import { OfferRdo } from './rdo/offer.rdo.js';
import { StatusCodes } from 'http-status-codes';
import { ParamOfferID, CreateOfferRequest } from './type/index.js';
import { CreateOfferDto, UpdateOfferDto } from './index.js';
import { CommentRdo } from '../comment/rdo/comment.rdo.js';
import { ValidateObjectIdMiddleware } from '../../libs/rest/middleware/validate-objectid.middleware.js';
import { ValidateDtoMiddleware } from '../../libs/rest/middleware/validate-dto.middleware.js';
import { DocumentExistsMiddleware } from '../../libs/rest/middleware/document-exists.middleware.js';

@injectable()
export class OfferController extends BaseController {
  constructor(
    @inject(Component.Logger) protected readonly logger: Logger,
    @inject(Component.OfferService) private readonly offerService: OfferService,
    @inject(Component.CommentService) private readonly commentService: CommentService,
  ) {
    super(logger);

    this.logger.info('Register routes for OfferController...');

    this.addRoute({ path: '/', method: HttpMethod.Get, handler: this.index });
    this.addRoute({ path: '/:offerId', method: HttpMethod.Get, handler: this.showById, middlewares: [new ValidateObjectIdMiddleware('offerId'), new DocumentExistsMiddleware(this.offerService, 'Offer', 'offerId')] });
    this.addRoute({ path: '/', method: HttpMethod.Post, handler: this.create, middlewares: [new ValidateDtoMiddleware(CreateOfferDto)] });
    this.addRoute({ path: '/:offerId', method: HttpMethod.Delete, handler: this.delete });
    this.addRoute({ path: '/:offerId', method: HttpMethod.Patch, handler: this.update });
    //комментарии
    this.addRoute({ path: '/:offerId/comments', method: HttpMethod.Get, handler: this.getComments });
  }

  public async index(_req: Request, res: Response): Promise<void> {
    const offers = await this.offerService.find();
    const responseData = fillDTO(OfferRdo, offers);
    this.ok(res, responseData);
  }

  public async showById({ params }: Request<ParamOfferID>, res: Response): Promise<void> {
    const { offerId } = params;
    const offer = await this.offerService.findById(offerId);
    this.ok(res, fillDTO(OfferRdo, offer));
  }

  //public async create({ body }: Request<Record<string, unknown>, Record<string, unknown>, CreateOfferDto>, res: Response): Promise<void> {
  public async create({ body }: CreateOfferRequest, res: Response): Promise<void> {
    const existOffer = await this.offerService.findOneByTitle(body.title);

    if (existOffer) {
      throw new HttpError(
        StatusCodes.UNPROCESSABLE_ENTITY,
        `Offer with title «${body.title}» exists.`,
        'OfferController'
      );
    }

    const result = await this.offerService.create(body);
    this.created(res, fillDTO(OfferRdo, result));
  }

  public async delete({ params }: Request<ParamOfferID>, res: Response): Promise<void> {
    const { offerId } = params;
    const offer = await this.offerService.deleteById(offerId);

    if (offer) {
      throw new HttpError(
        StatusCodes.NOT_FOUND,
        `Offer with «${offerId}» not found.`,
        'OfferController'
      );
    }

    this.noContent(res, offer);
  }

  public async update({ body, params }: Request<ParamOfferID, unknown, UpdateOfferDto>, res: Response): Promise<void> {
    const updatedOffer = await this.offerService.updateById(params.offerId, body);

    if (updatedOffer) {
      throw new HttpError(
        StatusCodes.NOT_FOUND,
        `Offer with «${params.offerId}» not found.`,
        'OfferController'
      );
    }

    this.ok(res, fillDTO(OfferRdo, updatedOffer));
  }

  public async getComments({ params }: Request<ParamOfferID>, res: Response): Promise<void> {
    const comments = await this.commentService.findByOfferId(params.offerId);
    this.ok(res, fillDTO(CommentRdo, comments));
  }


}
