import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose'

import { BooksController } from './Controllers/books/books.controller'
import { BooksService } from './Services/books/books.service';
import { BookSchema } from './Mongo/Schema/book.schema';
import { BookRepository } from './Mongo/Repository/book.repository';


@Module({
  imports: [

    MongooseModule.forRoot('mongodb://localhost/biblioteca', { useNewUrlParser: true, useUnifiedTopology: true } ),
    
    MongooseModule.forFeature([
        {name: 'books', schema: BookSchema}
    ]),

  ],
  controllers: [ BooksController ],
  providers: [ BooksService, BookRepository ],
})

export class AppModule {}
