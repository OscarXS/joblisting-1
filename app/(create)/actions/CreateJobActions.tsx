"use server"

import { prisma } from "@/lib/prisma"
import { revalidatePath } from "next/cache"

export type FormData = {
    name: string;
    description: string;
    location: string;
    author: string;
    salary: string;
    img: string;
    employmentType: string;
};

export async function createJob(data:FormData) {
    await prisma.jobPosting.create({
        data: {
            name: data.name,
            description: data.description,
            location: data.location,
            author: data.author,
            salary: parseFloat(data.salary),
            img: data.img,
            employmentType: data.employmentType,
          },
    })

    revalidatePath('/create')
}