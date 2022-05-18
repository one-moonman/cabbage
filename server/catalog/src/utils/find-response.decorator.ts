import { applyDecorators, Type, UseInterceptors } from '@nestjs/common';
import { ApiNotFoundResponse, ApiOkResponse } from '@nestjs/swagger';
import { NotFoundInterceptor } from './404.interceptor';

const findResponseDecorator = (
    model: string | Function | Type<unknown> | [Function],
    message: string
) => applyDecorators(
    ApiOkResponse({ type: model }),
    ApiNotFoundResponse(),
    UseInterceptors(new NotFoundInterceptor(message))
)

export default findResponseDecorator;