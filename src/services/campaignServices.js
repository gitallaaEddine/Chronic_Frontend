import { apiClient } from "../api/apiClient";

export const campaignService = {
  // Get all campaigns with filters
  getAll: async ({ skip, limit, category = "", city = "" }) => {
    const { data } = await apiClient.get("/campaign/get-campaign", {
      params: {
        skip,
        limit,
        category,
        city,
      },
    });

    return data.data?.campaigns || [];
  },

  // Get single campaign
  getById: async (id) => {
    const { data } = await apiClient.get(`/campaign/${id}`);

    return data;
  },

  // Create campaign
  create: (campaignData) => {
    return apiClient.post("/campaigns/create-campaign", campaignData);
  },

  // Update campaign
  update: (id, updates) => {
    return apiClient.patch(`/campaigns/update-campaign/${id}`, updates);
  },

  // Delete campaign
  delete: (id) => {
    return apiClient.delete(`/campaigns/delete-campaign/${id}`);
  },
};
