import { Collaborator, Company, Provider } from '../../../models';
import { CreateUserDTO } from '../../user/dto/user';
import { AuthCollaboratorDTO, AuthCompanyDTO, AuthProviderDTO } from '../dto/auth';

// 1 | Empresa
// 2 | Colaborador
// 3 | Profesional
// 4 | Admin

export enum TypesAuth {
  COMPANY = 'Empresa',
  COLLABORATOR = 'Colaborador',
  PROVIDER = 'Profesional',
}

type Type = TypesAuth.COLLABORATOR | TypesAuth.COMPANY | TypesAuth.PROVIDER;
type ModelsAuth = Company | Provider | Collaborator | undefined;

type AuthInDBF = (
  profileData: AuthCompanyDTO | AuthProviderDTO | AuthCollaboratorDTO,
  userData: CreateUserDTO,
  type: Type
) => Promise<ModelsAuth>;

export { AuthInDBF };
