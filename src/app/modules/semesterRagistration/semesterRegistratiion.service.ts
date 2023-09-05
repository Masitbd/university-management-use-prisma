import {
  SemesterRegistration,
  SemesterRegistrationStatus,
} from '@prisma/client';
import httpStatus from 'http-status';
import ApiError from '../../../errors/ApiError';
import prisma from '../../../shared/prisma';

const insertIntoDB = async (
  data: SemesterRegistration
): Promise<SemesterRegistration> => {
  const isAnySemesterUPcommingOrOngoing =
    await prisma.semesterRegistration.findFirst({
      where: {
        OR: [
          {
            status: SemesterRegistrationStatus.ONGOING,
          },
          {
            status: SemesterRegistrationStatus.UPCOMING,
          },
        ],
      },
    });

  if (isAnySemesterUPcommingOrOngoing) {
    throw new ApiError(
      httpStatus.BAD_REQUEST,
      `There is an ${isAnySemesterUPcommingOrOngoing.status}`
    );
  }
  const result = await prisma.semesterRegistration.create({ data });
  return result;
};

const updateOneInDB = async (
  id: string,
  payload: Partial<SemesterRegistration>
): Promise<SemesterRegistration> => {
  const isExists = await prisma.semesterRegistration.findUnique({
    where: {
      id,
    },
  });

  if (!isExists) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Data not found');
  }

  if (
    payload.status &&
    isExists.status === SemesterRegistrationStatus.UPCOMING &&
    payload.status !== SemesterRegistrationStatus.ONGOING
  ) {
    throw new ApiError(
      httpStatus.BAD_REQUEST,
      'Can only move from upcomming to ongoing'
    );
  }
  if (
    payload.status &&
    isExists.status === SemesterRegistrationStatus.ONGOING &&
    payload.status !== SemesterRegistrationStatus.ENDED
  ) {
    throw new ApiError(
      httpStatus.BAD_REQUEST,
      'Can only move from upcomming to ongoing'
    );
  }
  const result = await prisma.semesterRegistration.update({
    where: {
      id,
    },
    data: payload,
    include: {
      academicSemester: true,
    },
  });
  return result;
};

export const SemesterRegistrationService = { insertIntoDB, updateOneInDB };
