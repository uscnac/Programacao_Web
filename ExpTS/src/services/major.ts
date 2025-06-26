import { PrismaClient, Major } from "../generated/prisma";
import { CreateMajorDTO } from "../types/major";

const prisma = new PrismaClient()

export const getMajors = async (): Promise<Major[]> => {
    return await prisma.major.findMany()
}

export const createMajor = async (major: CreateMajorDTO): Promise<Major> => {
    return await prisma.major.create({ data: major })
}