import { Exclude, Expose } from 'class-transformer';
import { Role } from 'src/role/role.enum';
import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class User extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  username: string;

  @Column()
  password: string;

  @Column({ default: 'duy' })
  firstName: string;

  @Column()
  lastName: string;

  @Exclude()
  @Column({ default: true })
  isActive: boolean;

  @Column()
  roles: string;

  @Expose()
  fullName() {
    return this.firstName + ' ' + this.lastName;
  }
}
