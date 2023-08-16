import {
  Model,
  Table,
  Column,
  DataType,
  PrimaryKey,
  IsUUID,
} from 'sequelize-typescript';

@Table({ tableName: 'user_type' })
export class User_type extends Model {
  @IsUUID(4)
  @PrimaryKey
  @Column({ type: DataType.UUID, defaultValue: DataType.UUIDV4, primaryKey: true })
  public id!: string;

  @Column({ type: DataType.STRING, allowNull: false })
  name!: string;
}
