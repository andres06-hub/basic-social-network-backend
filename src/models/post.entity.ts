import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { IPost } from 'src/post/interfaces/data';

@Entity({ name: 'Post' })
export class Post implements IPost {
  @PrimaryGeneratedColumn()
  id: number;

  @Column('text')
  title: string;

  @Column('text')
  message: string;

  @Column('int')
  createdAt: number;

  @Column({
    nullable: true,
    type: 'int',
  })
  updatedAt: number;

  @Column({
    nullable: false,
    type: 'int',
  })
  userId: number;
}
