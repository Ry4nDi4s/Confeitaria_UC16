// prisma/seed.js
import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

// Helpers idempotentes (usam únicos `name`)
async function upsertRole({ name, description }) {
  return prisma.role.upsert({
    where: { name },
    update: { description },
    create: { name, description }
  });
}

async function upsertGroup({ name, description }) {
  return prisma.group.upsert({
    where: { name },
    update: { description },
    create: { name, description }
  });
}

// Vincula papel ao grupo (idempotente via @@unique([groupId, roleId]))
async function connectRoleToGroup({ groupId, roleId }) {
  return prisma.roleGroup.upsert({
    where: {
      // precisa de um identificador único. Criaremos um “composite key surrogate”
      // usando @@unique([groupId, roleId]) → Prisma exige um nome. Podemos usar um find+create:
      // Porém o upsert requer um unique. Alternativa: try/catch create.
      // Para usar upsert puro, crie um unique artificial:
      // @@unique([groupId, roleId], name: "group_role_unique")
      groupId_roleId: { groupId, roleId } // nomeamos a unique como "groupId_roleId"
    },
    update: {},
    create: { groupId, roleId }
  });
}

// Vincula user ao grupo (idempotente via @@unique([userId, groupId]))
async function connectUserToGroup({ userId, groupId }) {
  return prisma.groupUser.upsert({
    where: {
      userId_groupId: { userId, groupId } // idem: nomeie a unique
    },
    update: {},
    create: { userId, groupId }
  });
}

async function main() {
  // 1) Cria Roles
  const rolesData = [
    { name: 'UserPost', description: 'Adicionar User' },
    { name: 'UserDelete', description: 'Deletar Usuário' },
    { name: 'UserUpdate', description: 'Editar Usuário' },
    { name: 'PostProduct', description: 'Adicionar Produto' },
    { name: 'ProductDelete', description: 'Deletar Produto' },
    { name: 'ProductUpdate', description: 'Editar Produto' },
    { name: 'IngredientePost', description: 'Adicionar Ingrediente' },
    { name: 'IngredienteUpdate', description: 'Editar Ingrediente' },
    { name: 'IngredienteDelete', description: 'Deletar Ingrediente' },
    { name: 'ReceitaPost', description: 'Adicionar Receita' },
    { name: 'ReceitaUpdate', description: 'Editar Receita' },
    { name: 'ReceitaDelete', description: 'Deletar Receita' },
    { name: 'OrderUpdate', description: 'Editar Order' },
    { name: 'OrderDelete', description: 'Deletar Order' },
  ];

  const roles = {};
  for (const r of rolesData) {
    const role = await upsertRole(r);
    roles[role.name] = role; // roles.ADMIN, roles.EDITOR, etc, os names passados acimas
  }

  // 2) Cria Groups
  const groupsData = [
    { name: 'ADMIN', description: 'Administrador' },
  ];

  const groups = {};
  for (const g of groupsData) {
    const group = await upsertGroup(g);
    groups[group.name] = group; // groups['Turma TI43'], etc.
  }

  // 3) Vincula Roles aos Groups
  // Crie um nome para a unique composta no schema para permitir upsert,
  // ex: @@unique([groupId, roleId], name: "group_role_unique")
  await connectRoleToGroup({ groupId: groups['ADMIN'].id, roleId: roles.UserPost.id });
  await connectRoleToGroup({ groupId: groups['ADMIN'].id, roleId: roles.UserDelete.id });
  await connectRoleToGroup({ groupId: groups['ADMIN'].id, roleId: roles.UserUpdate.id });

  await connectRoleToGroup({ groupId: groups['ADMIN'].id, roleId: roles.PostProduct.id });
  await connectRoleToGroup({ groupId: groups['ADMIN'].id, roleId: roles.ProductDelete.id });
  await connectRoleToGroup({ groupId: groups['ADMIN'].id, roleId: roles.ProductUpdate.id });

  await connectRoleToGroup({ groupId: groups['ADMIN'].id, roleId: roles.IngredientePost.id });
  await connectRoleToGroup({ groupId: groups['ADMIN'].id, roleId: roles.IngredienteUpdate.id });
  await connectRoleToGroup({ groupId: groups['ADMIN'].id, roleId: roles.IngredienteDelete.id });

  await connectRoleToGroup({ groupId: groups['ADMIN'].id, roleId: roles.ReceitaPost.id });
  await connectRoleToGroup({ groupId: groups['ADMIN'].id, roleId: roles.ReceitaUpdate.id });
  await connectRoleToGroup({ groupId: groups['ADMIN'].id, roleId: roles.ReceitaDelete.id });

  await connectRoleToGroup({ groupId: groups['ADMIN'].id, roleId: roles.OrderUpdate.id });
  await connectRoleToGroup({ groupId: groups['ADMIN'].id, roleId: roles.OrderDelete.id });

  // 4) (Opcional) Vincula Users a Groups
  // Se já existir User com id 1 e 2, por exemplo:

  try {
    const hash = await bcrypt.hash("12345678o", 10)

    const userCreated = await prisma.user.create({
      data: {
        name: "Daniela",
        email: "dani@gmail.com",
        password: hash,
        phone: "(16)99999-9999",
        CPF: "598.432.231-88"
      }
    });
    await connectUserToGroup({ userId: 1, groupId: groups['ADMIN'].id });
  } catch { }
  console.log('Seed concluído com Roles, Groups, RoleGroup e GroupUser');
}

main()
  .catch((e) => { console.error(e); process.exit(1); })
  .finally(async () => { await prisma.$disconnect(); });
