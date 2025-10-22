import prisma from "../../lib/prisma";

export const interviewerDashboard = async (userId: any) => {
  // interviews that include the user (participants.some.userId = userId)
  const interviewCount: any = await prisma.interview.count({
    where: { interviewerId: userId },
  });
  const scheduledInterviewsCountToday = await prisma.interview.count({
    where: {
      interviewerId: userId,
      scheduled_at: {
        // use today at 12:00 PM (noon) as the start and tomorrow at 12:00 PM as the end
        gte: (() => {
          const d = new Date();
          d.setHours(12, 0, 0, 0);
          return d;
        })(),
        lte: (() => {
          const d = new Date();
          d.setDate(d.getDate() + 1);
          d.setHours(12, 0, 0, 0);
          return d;
        })(),
      },
      status: "SCHEDULED",
    },
  });
  const shortlistedCount = await prisma.interview.count({
    where: {
      interviewerId: userId,
      participants: {
        some: { sortlisted: true },
      },
    },
  });
  const [scheduled, completed, cancelled] = await Promise.all([
    prisma.interview.count({
      where: {
        interviewerId: userId,
        status: "SCHEDULED",
      },
    }),
    prisma.interview.count({
      where: {
        interviewerId: userId,
        status: "COMPLETED",
      },
    }),
    prisma.interview.count({
      where: {
        interviewerId: userId,
        status: "CANCELLED",
      },
    }),
  ]);

  const year = new Date().getFullYear();
  const dateFilter: any = year
    ? { gte: new Date(year, 0, 1), lt: new Date(year + 1, 0, 1) }
    : undefined;

  // fetch interviews for this interviewer that have shortlisted participants
  // and (optionally) fall within the requested year. Only select scheduled_at and
  // shortlisted participants to keep payload small.
  const interviews = await prisma.interview.findMany({
    where: {
      interviewerId: userId,
      ...(dateFilter ? { scheduled_at: dateFilter } : {}),
    },
    select: {
      scheduled_at: true,
      participants: true,
    },
  });

  // aggregate by YYYY-MM string
  const interview_shortlistedCount = new Map<string, any>();
  for (const it of interviews) {
    const d = it.scheduled_at;
    const key = `${String(d.getMonth() + 1).padStart(2, "0")}`;
    const shortlistedCount = (it.participants && it.participants.length && it.participants[0].sortlisted ? 1 : 0) || 0;
    const temp = interview_shortlistedCount.get(key) || { count: 0, shortlisted: 0 };
    temp.count += 1;
    temp.shortlisted += shortlistedCount;
    interview_shortlistedCount.set(key, temp);
  }

  // convert to sorted array
  const result = Array.from(interview_shortlistedCount.entries())
    .sort((a, b) => (a[0] < b[0] ? -1 : 1))
    .map(([month, data]) => ({ month, data }));
    console.log("interviewer dashboard result:", result);

     const targetYear = year ?? new Date().getFullYear();

  // fetch feedbacks for the user (either given_to_user_id or given_by_user_id)
//   const where: any = "received" === "recived"
//     ? { given_to_user_id: userId }
//     : { given_by_user_id: userId };
const where: any = { given_by_user_id: userId };
  // limit to the year
  where.created_at = { gte: new Date(targetYear, 0, 1), lt: new Date(targetYear + 1, 0, 1) };

  const feedbacks = await prisma.feedback.findMany({ where, select: { score: true, rating: true, created_at: true, interviewId: true } });

  // helper to get ISO week key YYYY-WW
  const getWeekKey = (d: Date) => {
    // Copy date so don't modify original
    const date = new Date(Date.UTC(d.getFullYear(), d.getMonth(), d.getDate()));
    // Thursday in current week decides the year.
    date.setUTCDate(date.getUTCDate() + 4 - (date.getUTCDay() || 7));
    const yearStart = new Date(Date.UTC(date.getUTCFullYear(), 0, 1));
    const weekNo = Math.ceil(((date.getTime() - yearStart.getTime()) / 86400000 + 1) / 7);
    return `${String(weekNo).padStart(2, "0")}`;
  };

  const map = new Map<string, { count: number; sumScore: number; sumRating: number }>();
  for (const f of feedbacks) {
    const key = getWeekKey(new Date(f.created_at));
    const entry = map.get(key) ?? { count: 0, sumScore: 0, sumRating: 0 };
    entry.count += 1;
    entry.sumScore += f.score ?? 0;
    entry.sumRating += f.rating ?? 0;
    map.set(key, entry);
  }

  const scoreresult = Array.from(map.entries())
    .sort((a, b) => (a[0] < b[0] ? -1 : 1))
    .map(([week, v]) => ({ week, count: v.count, averageScore: v.count ? v.sumScore / v.count : 0, averageRating: v.count ? v.sumRating / v.count : 0 }));

  return {
    data: {
      interviewCount,
      scheduledToday: scheduledInterviewsCountToday,
      shortlisted: shortlistedCount,
      avgDuration: 3, // placeholder for now,
      interviewData: {
        scheduled,
        completed,
        cancelled,
      },
      result,
      scoreresult
    },
    isFailed: false,
  };
};
export const interviewerUpcomingInterviews = async (userId: any, q: string) => {
  const upcomingInterviews = await prisma.interview.findMany({
    where: {
      interviewerId: userId,

      scheduled_at: {
        gte: new Date(),
      },
      OR: [
        { name: { contains: q, mode: "insensitive" } },
        { type: { contains: q, mode: "insensitive" } },
        {
          participants: {
            some: {
              user: {
                first_name: { contains: q, mode: "insensitive" },
              },
            },
          },
        },
        {
          participants: {
            some: {
              user: {
                last_name: { contains: q, mode: "insensitive" },
              },
            },
          },
        },
      ],
    },
    select: {
      id:true,
      scheduled_at: true,
      status: true,
      session_link: true,
      interviewerId: true,
      type: true,
      name: true,

      user: {
        
        select: {
          first_name:true,
          last_name:true,
          email:true,
          userPositions: {
            take: 1,
            select: {
              position:{
                  select:{
                      title:true,
                  }
              },
              brand: {
                select: {
                  name: true,
                  website_url: true,
                  industry: true,
                },
              },
            },
          },
        },
      },
      participants: {
        select: {
          user: {
            select: {
              first_name: true,
              last_name: true,
              email: true,
            },
          },
        },
      },
    },
  });
  return { isFailed: false, data: upcomingInterviews };
};
export const interviewerHistoryInterviews = async (
  userId: any,
  q: string,
  page: number = 1,
  limit: number = 10
) => {
  const take = Math.max(1, Math.min(100, limit));
  const skip = (Math.max(1, page) - 1) * take;
  const upcomingInterviews = await prisma.interview.findMany({
    where: {
      interviewerId: userId,

      OR: [
        { name: { contains: q, mode: "insensitive" } },
        { type: { contains: q, mode: "insensitive" } },
        {
          participants: {
            some: {
              user: {
                first_name: { contains: q, mode: "insensitive" },
              },
            },
          },
        },
        {
          participants: {
            some: {
              user: {
                last_name: { contains: q, mode: "insensitive" },
              },
            },
          },
        },
      ],
    },
    skip,
    take,
    select: {
      id:true,
      scheduled_at: true,
      status: true,
      session_link: true,
      interviewerId: true,
      type: true,
      name: true,
      
      feedbacks: {
        select:{
          score:true,
          rating:true,
          positive_aspects:true,
          negative_aspects:true,
          feedbackSkills:{
            select:{
              value:true,
              skill:true
            }
          }
        }
      },
      user: {
        select: {
          first_name:true,
          last_name:true,
          email:true,
          userPositions: {
            take: 1,
            select: {
              position:{
                  select:{
                      title:true,
                  }
              },
              brand: {
                select: {
                  name: true,
                  website_url: true,
                  industry: true,
                },
              },
            },
          },
        },
      },
      participants: {
        select: {
          sortlisted: true,
          user: {
            select: {
              first_name: true,
              last_name: true,
              email: true,
            },
          },
        },
      },
    },
  });
  // also provide pagination meta
  const total = await prisma.interview.count({
    where: {
      interviewerId: userId,
      OR: [
        { name: { contains: q, mode: "insensitive" } },
        { type: { contains: q, mode: "insensitive" } },
        {
          participants: {
            some: {
              user: { first_name: { contains: q, mode: "insensitive" } },
            },
          },
        },
        {
          participants: {
            some: { user: { last_name: { contains: q, mode: "insensitive" } } },
          },
        },
      ],
    },
  });
  return {
    isFailed: false,
    data: upcomingInterviews,
    meta: { page, limit: take, total, pages: Math.ceil(total / take) },
  };
};

