import {
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Query,
  UsePipes,
} from '@nestjs/common';
import { SearchService } from './search.service';
import { searchValidationPipe } from './dto/validation.pipe';

@Controller('search')
export class SearchController {
  constructor(private readonly searchService: SearchService) {}
  // search with all query
  @Get()
  @UsePipes(searchValidationPipe)
  @HttpCode(HttpStatus.OK)
  searchAll(@Query('keyword') keyword: string) {
    return this.searchService.searchAll(keyword);
  }

  // search by field
  @Get('field')
  @UsePipes(searchValidationPipe)
  @HttpCode(HttpStatus.OK)
  searchByField(
    @Query('keyword') keyword: string,
    @Query('field') field: string,
  ) {
    return this.searchService.searchByField(keyword, field);
  }
}
