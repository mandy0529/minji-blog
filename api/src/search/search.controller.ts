import { Controller, Get, HttpCode, HttpStatus, Query } from '@nestjs/common';
import { SearchService } from './search.service';

@Controller('search')
export class SearchController {
  constructor(private readonly searchService: SearchService) {}
  // search with all query
  @Get()
  @HttpCode(HttpStatus.OK)
  searchAll(@Query('keyword') keyword: string) {
    return this.searchService.searchAll(keyword);
  }

  // search by field
  @Get('field')
  @HttpCode(HttpStatus.OK)
  searchByField(
    @Query('keyword') keyword: string,
    @Query('field') field: string,
  ) {
    return this.searchService.searchByField(keyword, field);
  }
}
