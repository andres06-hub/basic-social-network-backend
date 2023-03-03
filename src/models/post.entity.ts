import { Column, Entity, PrimaryGeneratedColumn, Timestamp } from 'typeorm';

@Entity({ name: 'Posts' })
export class Post {
  @PrimaryGeneratedColumn()
  id: number;

  @Column('text')
  title: string;

  @Column('text')
  message: string;

  @Column('int')
  createdAt: Timestamp;
}
