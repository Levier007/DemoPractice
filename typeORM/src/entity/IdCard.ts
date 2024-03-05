import { Entity, Column, PrimaryGeneratedColumn, JoinColumn, OneToOne } from 'typeorm'
import { User } from './User'

@Entity()
export class IdCard {
  @PrimaryGeneratedColumn()
  id: number

  @Column({ length: 50, comment: '身份证号码' })
  cardName: string

  @JoinColumn()
  @OneToOne(() => User, {
    cascade: true,
    onDelete: 'CASCADE'
  })
  user: User
}
