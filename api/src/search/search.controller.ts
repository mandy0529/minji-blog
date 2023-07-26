import { Controller, Get, Query } from '@nestjs/common';
import { SearchService } from './search.service';

@Controller('search')
export class SearchController {
  constructor(private readonly searchService: SearchService) {}

  // search by created-at
  @Get('/created-at')
  searchByCreatedAt(@Query('date') date: string) {
    return this.searchService.searchByCreatedAt(date);
  }

  // search by author
  @Get('/author')
  searchByAuthor(@Query('author') author: string) {
    return this.searchService.searchByAuthor(author);
  }

  // search by title or content
  @Get('/title-content')
  searchByContentOrTitle(@Query('keyword') keyword: string) {
    return this.searchService.searchByContentOrTitle(keyword);
  }

  // search by hashtag
  @Get('/hashtag')
  searchByContent(@Query('keyword') keyword: string) {
    return this.searchService.searchByHashtag(keyword);
  }
}
