import { ObjectId } from 'mongoose';
import { Injectable, BadRequestException } from '@nestjs/common';
import { BookDTO } from 'src/DTO/book.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Book } from 'src/Mongo/Interfaces/book.interface';
import { BookRepository } from 'src/Mongo/Repository/book.repository';

@Injectable()
export class BooksService {

    constructor(
        private readonly bookRepository : BookRepository
    ){}

    async getAllBooks(): Promise<Book[]> {
        const allBooks = await this.bookRepository.getAllBooks();
        
        if(!allBooks.length)
            throw new BadRequestException('There are no books registered yet');
        else
            return allBooks;

    }

    async getBookById(bookID: string) : Promise<Book> {
        
        try{
            return await this.bookRepository.findById(bookID);
        } catch(e){
            throw new BadRequestException('This book does not exist');
        }


    }

    async getBookByName(bookName: string) : Promise<Book[]> {
        return this.bookRepository.findBookByName(bookName);
    }

    async saveBook(newBook: BookDTO) : Promise<Book> {
        return await this.bookRepository.saveBook(newBook);
    }

    async deleteBook(bookID: string) {

        try{
            const bookExists = await this.bookRepository.findById(bookID);
            
            if(bookExists){
                const deletedBook = await this.bookRepository.deleteBook(bookID);

                if(deletedBook)
                    return 'This book was deleted successfully';

            } else {
                throw new BadRequestException('This book does not exist');
            }

        } catch(e) {
            throw new BadRequestException('This book does not exist');
        }

    }

    async updateBook(bookID: string, book: BookDTO) {
        
        try{
            const bookExists = await this.bookRepository.findById(bookID);

            if(bookExists){
                const updatedBook = await this.bookRepository.updateBook(bookID, book);

                if(updatedBook)
                    return 'This book was updated successfully';

            } else {
                throw new BadRequestException('This book does not exist');
            }

        } catch(e) {
            throw new BadRequestException('This book does not exist');
        }

    }

    async getBookByAuthorName(authorName: string): Promise<Book[]>{
        
        let authorNameArray = authorName.split(' ');
        
        const foundBooks = await this.bookRepository.getBookByAuthorName(authorNameArray);

        if(foundBooks.length)
            return foundBooks;
        else
            throw new BadRequestException('No results for this author');

    }

}
