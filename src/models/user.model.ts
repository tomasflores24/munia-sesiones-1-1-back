// import { Sequelize, DataType, Model, ModelCtor } from 'sequelize-typescript';

// export interface UserModel extends Model {
//   name: string;
//   cualquierCosa: string;
// }

// export default (sequelize: Sequelize): ModelCtor<UserModel> => {
//   const User = sequelize.define<UserModel>('users', {
//     name: {
//       type: DataType.STRING,
//       allowNull: false,
//     },
//   });
//   return User;
// };
// TODO

// import { Model, Table, Column, DataType } from 'sequelize-typescript';

// @Table({ tableName: 'users' })
// export class User extends Model {
//   @Column({ type: DataType.STRING, allowNull: false })
//   name!: string;

//   @Column({ type: DataType.STRING, allowNull: false })
//   cualquierCosa!: string;
// }

// TODO
import { Model, Table, Column, DataType } from 'sequelize-typescript';

@Table({
  tableName: 'users', // El nombre de la tabla en la base de datos
})
export class User extends Model {
  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  name!: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  cualquierCosa!: string;
}

export default User; // Exporta el modelo User
