import {
  Model,
  Table,
  Column,
  DataType,
  PrimaryKey,
  IsUUID,
} from 'sequelize-typescript';

@Table({ tableName: 'membership_relationship' })
export class Membership_relationship extends Model {
  @IsUUID(4)
  @PrimaryKey
  @Column({ type: DataType.UUID, defaultValue: DataType.UUIDV4, primaryKey: true })
  public id!: string;

  @Column({ type: DataType.INTEGER, allowNull: false })
  number_sessions!: number;

  @Column({ type: DataType.DATE, allowNull: false })
  scheduling_date!: Date;

  @Column({ type: DataType.STRING })
  observation!: string;
}
