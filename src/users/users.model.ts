import { Table, Column, Model, DataType } from 'sequelize-typescript';

@Table({ tableName: 'user_data' })
export class User extends Model {
  @Column({
    type: DataType.UUID,
    defaultValue: DataType.UUIDV4,
    primaryKey: true,
    autoIncrement: true,
  })
  declare id: number;

  @Column({ type: DataType.STRING, unique: true, allowNull: false })
  declare login: string;

  @Column({ type: DataType.INTEGER, allowNull: false })
  declare tabel: number;

  @Column({ type: DataType.STRING, allowNull: false })
  declare password: string;
}
