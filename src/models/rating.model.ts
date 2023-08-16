import {
  Model,
  Table,
  Column,
  DataType,
  PrimaryKey,
  IsUUID,
} from 'sequelize-typescript';

@Table({ tableName: 'rating' })
export class Rating extends Model {
  @IsUUID(4)
  @PrimaryKey
  @Column({ type: DataType.UUID, defaultValue: DataType.UUIDV4, primaryKey: true })
  public id!: string;

  @Column({ type: DataType.FLOAT, allowNull: false })
  rating!: number;

  @Column({ type: DataType.STRING, allowNull: false })
  comentary!: string;

  @Column({ type: DataType.BOOLEAN, allowNull: false })
  isActive!: boolean;
}
