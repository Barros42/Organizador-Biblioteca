import { Controller, Get, Post, Body, BadRequestException, Delete, Param, Put, Patch } from '@nestjs/common';
import { BooksService } from 'src/Services/books/books.service';
import { BookDTO } from 'src/DTO/book.dto';
import { Book } from 'src/Mongo/Interfaces/book.interface';

@Controller('books')
export class BooksController {

    constructor(
        private readonly booksService : BooksService
    ) {}

    @Get()
    getAllBooks(): Promise<Book[]> {
        return this.booksService.getAllBooks();
    }

    @Get('id/:bookID')
    async getBookById(@Param('bookID') bookID: string) {
        return await this.booksService.getBookById(bookID);
    }

    @Get('name/:bookName')
    async getBookByName(@Param('bookName') bookName: string) {
        return await this.booksService.getBookByName(bookName);
    }

    @Get('author/:authorName')
    async getBookByAuthorName(@Param('authorName') authorName: string) {
        return await this.booksService.getBookByAuthorName(authorName);
    }

    @Post()
    async saveBook(@Body() newBook : BookDTO): Promise<Book> {
        return await this.booksService.saveBook(newBook);
    }

    @Delete(':bookID')
    async deleteBook(@Param('bookID') bookID: string) {
        return await this.booksService.deleteBook(bookID);
    }

    @Patch(':bookID')
    async updateBook(@Param('bookID') bookID: string, @Body() book: BookDTO) {
        return await this.booksService.updateBook(bookID, book);
    }

}
