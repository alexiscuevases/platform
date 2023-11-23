import { DeleteResourceInterface, ResponseInterface } from "interfaces";
import { deleteResource, uploadResource } from "utilities";

export class ResourceController {
  getResourceUrlByPublicId(public_id: string): string {
    return `https://res.cloudinary.com/${process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME}/${public_id}`;
  }

  async uploadResources(resources: File[]): Promise<ResponseInterface<any, any>> {
    const uploadedResources = [];

    for (const resource of resources) {
      const formData = new FormData();
      formData.append("resource", resource);

      const uploaded = await uploadResource(formData, {
        folder: "/products"
      });
      if (uploaded.success)
        uploadedResources.push({
          storage: "Cloudinary",
          path: uploaded.result.public_id
        });
    }

    if (uploadedResources.length > 0) return { success: true, result: uploadedResources };
    return { success: false, errors: { GENERAL_ERROR: "Resources not uploaded" } };
  }

  async deleteResources(resources: DeleteResourceInterface[]) {
    const deletedResources = [];

    for (const resource of resources) {
      const deleted = await deleteResource(resource.path);
      if (deleted.success) deletedResources.push(deleted);
    }

    if (deletedResources.length > 0) return { success: true, result: deletedResources };
    return { success: false, errors: { GENERAL_ERROR: "Resources not deleted" } };
  }
}
