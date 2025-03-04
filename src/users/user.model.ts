import { Table, Column, Model, DataType } from 'sequelize-typescript';

@Table({ tableName: 'user_data' })
export class User extends Model {
  @Column({
    primaryKey: true,
    autoIncrement: true,
    type: DataType.INTEGER,
  })
  declare id: number;

  @Column({ unique: true })
  login: string;

  @Column
  tabel: string;

  @Column
  password: string;
}
