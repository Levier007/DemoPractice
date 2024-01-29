import { Entity, Column, PrimaryGeneratedColumn, JoinColumn, ManyToOne } from 'typeorm'
import { Article } from './Article'

@Entity()
export class Tag {
  @PrimaryGeneratedColumn()
  id: number

  @Column({
    length: 100
  })
  name: string
}
