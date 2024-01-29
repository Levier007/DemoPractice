import { Entity, PrimaryGeneratedColumn, Column, OneToOne } from 'typeorm'
import { IdCard } from './IdCard'

@Entity()
export class Department {
  @PrimaryGeneratedColumn()
  id: number

  @Column({ length: 50 })
  name: string
}
