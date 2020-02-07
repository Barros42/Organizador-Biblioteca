import { Injectable } from "@nestjs/common";
import { InjectModel, InjectConnection } from "@nestjs/mongoose";
import { Model, Connection, ObjectId } from 'mongoose';
import { Book } from "../Interfaces/book.interface";
import { BookDTO } from "src/DTO/book.dto";

@Injectable()
export class BookRepository {

    constructor(
        @InjectModel('books') private readonly bookModel: Model<Book>
    ){}

    async getAllBooks() : Promise<Book[]>{
        return await this.bookModel.find({}, { __v: false }).sort({ name : + 1}).exec();
    }

    async saveBook(newBook : BookDTO): Promise<Book>{
        const createdBook = new this.bookModel(newBook);
        return createdBook.save();
    }

    async findById(bookID: string): Promise<Book>{
        return await this.bookModel.findById(bookID, { __v : false});
    }

    async deleteBook(bookID: string): Promise<Book>{
        return await this.bookModel.findOneAndDelete({ _id : bookID});
    }

    async updateBook(bookID: string, book: BookDTO): Promise<Book>  {
        return await this.bookModel.replaceOne({ _id: bookID}, book);
    }

    async findBookByName(bookName: string): Promise<Book[]> { 
        return await this.bookModel.find({ name : { '$regex' : bookName, '$options' : 'i' } }, { __v : false});
    }

    async getBookByAuthorName(authorName: string[]): Promise<Book[]> {
        return await this.bookModel.find({ 
            $or : [
                    { "author.name"  : { $in: authorName } },
                    { "author.surname" : { $in: authorName } }
            ]

        });
    }

}