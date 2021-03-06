import { IAnnouncement, Announcement } from "../models/Announcement";
import { Status } from "../models/status";

export class AnnouncementService {
    public static async getAllAnnouncements(): Promise<IAnnouncement[]> {
        return await Announcement.findAll();
    }

    public static async subscribeOrganisation(announcementId: number, organisationId: number) {
        return await Announcement.update(
            { organizationId: organisationId, status: Status.InProgress },
            { where: { id: announcementId } },
        );
    }

    public static async getAnnouncement(announcementId: number): Promise<IAnnouncement> {
        const announcement = await Announcement.findByPk(announcementId);

        if (announcement) {
            return announcement;
        } else {
            throw Error("500");
        }
    }

    public static async addAnnouncement(model: IAnnouncement): Promise<IAnnouncement> {
        const announcement = await Announcement.create(model);

        if (announcement) {
            return announcement;
        } else {
            throw new Error("500");
        }
    }

    public static async deleteAnnouncement(announcementId: number): Promise<void> {
        const res = await Announcement.destroy(
            {
                where: {
                    id: announcementId,
                },
            },
        );

        if (!res) {
            throw new Error("500");
        }
    }

    public static async updateAnnouncement(model: IAnnouncement, announcementId: number): Promise<void> {
        await Announcement.update(model,
            {
                where: {
                    id: announcementId,
                },
            },
        );
    }

    public static async changeStatus(announcementId: number, status: number): Promise<void> {
        await Announcement.update({ status },
            {
                where: {
                    id: announcementId,
                },
            },
        );
    }
}
