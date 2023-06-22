import { FunctionComponent } from "react";
import TeamsRoleTable from "../../components/TeamsRoleTable";
import { useLogic } from "./teams.logic";
import { modulesImages } from "@/shared/enums/modules-images";

const Teams: FunctionComponent = () => {
  const {
    handleActivateMember,
    handleNavigateToEdit,
    handleNavigateToEditPermission,
    handleSetMemberToDelete,
    handleSetMemberToDeactivate,
    data,
  } = useLogic();

  return (
    <TeamsRoleTable
      onModuleClick={handleNavigateToEditPermission}
      onEditClick={handleNavigateToEdit}
      onActivateClick={handleActivateMember}
      onDeleteClick={handleSetMemberToDelete}
      onDeactivivateClick={handleSetMemberToDeactivate}
      data={data?.users.data.map((item) => ({
        id: item.id,
        permissions: item.abilities.map((ability) => ability.title),
        modules: item.modules.map((item) => ({
          src: modulesImages[item],
          name: item,
        })),
        entity: {
          email: item.email,
          name: item.name,
          is_active: item.is_active,
        },
        role: item.role,
      }))}
    />
  );
};

export default Teams;
