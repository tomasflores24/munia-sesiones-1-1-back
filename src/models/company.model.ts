import {
  Model,
  Table,
  Column,
  DataType,
  PrimaryKey,
  IsUUID,
} from 'sequelize-typescript';

@Table({ tableName: 'company' })
export class Company extends Model {
  @IsUUID(4)
  @PrimaryKey
  @Column({ type: DataType.UUID, defaultValue: DataType.UUIDV4, primaryKey: true })
  public id!: string;

  @Column({ type: DataType.INTEGER, allowNull: false })
  phone!: number;

  @Column({ type: DataType.STRING, allowNull: false })
  register_id!: string;
}
