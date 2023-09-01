import {
  Model,
  Table,
  Column,
  DataType,
  PrimaryKey,
  AutoIncrement,
} from 'sequelize-typescript';

@Table({
  tableName: 'provider_assign_service',
  timestamps: false,
})
export class Provider_assign_service extends Model {
  @PrimaryKey
  @AutoIncrement
  @Column({ type: DataType.INTEGER, primaryKey: true })
  public id!: string;

  @Column({ type: DataType.INTEGER, allowNull: false })
  duration!: number;

  @Column({ type: DataType.FLOAT, allowNull: false })
  price!: number;

  @Column({ type: DataType.BOOLEAN, allowNull: false })
  isActive!: boolean;
}
