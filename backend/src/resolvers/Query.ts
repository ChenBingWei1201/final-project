import { prisma } from "../../prisma/client.ts";

const Query = {
  // Announcement Start
  AllAnnouncements: async (_parents, _args, _context) => {
    const announcements = await prisma.announcement.findMany();
    return announcements;
  },

  HomepageAnnouncements: async (_parents, _args, _context) => {
    const announcements = await prisma.announcement.findMany({
      take: 5,
      orderBy: {
        date: "desc",
      },
    });
    return announcements;
  },
  // Announcement End

  // User Start
  AllUsers: async (_parents, _args, _context) => {
    const users = await prisma.user.findMany();
    return users;
  },
  // User End

  // Article Start
  AllArticles: async (_parents, _args, _context) => {
    const articles = await prisma.article.findMany();
    return articles;
  },

  HomepageArticles: async (_parents, _args, _context) => {
    const articles = await prisma.article.findMany({
      take: 5,
      orderBy: {
        date: "desc",
      },
    });
    return articles;
  },

  SortArticlesByTime: async (_parents, _args, _context) => {
    const articles = await prisma.article.findMany({
      orderBy: {
        id: "desc",
      },
    });
    return articles;
  },

  SortArticlesByLike: async (_parents, _args, _context) => {
    const articles = await prisma.article.findMany({
      orderBy: {
        likes: {
          _count: "desc",
        },
      },
    });
    return articles;
  },
  // Article End

  // ArticleComment Start
  AllArticleComments: async (_parents, _args, _context) => {
    const articleComments = await prisma.articleComment.findMany();
    return articleComments;
  },
  // ArticleComment End

  // Liked Articles Start
  AllLikedArticles: async (_parents, args: { likerId: number }, _context) => {
    const likerId = args.likerId;
    const likes = await prisma.likedArticle.findMany({
      where: {
        likerId: likerId,
      },
    });

    const likedArticleIds = likes.map((like) => {
      return like.articleId;
    });
    const likedArticles = await prisma.article.findMany({
      where: {
        id: {
          in: likedArticleIds,
        },
      },
    });
    return likedArticles;
  },
  // Liked Articles End

  // Liked ArticleComments Start
  AllLikedArticleComments: async (
    _parents,
    args: { likerId: number },
    _context,
  ) => {
    const likerId = args.likerId;
    const likes = await prisma.likedArticleComment.findMany({
      where: {
        likerId: likerId,
      },
    });

    const likedArticleCommentIds = likes.map((like) => {
      return like.articleCommentId;
    });
    const likedArticleComments = await prisma.articleComment.findMany({
      where: {
        id: {
          in: likedArticleCommentIds,
        },
      },
    });
    return likedArticleComments;
  },
  // Liked ArticleComments End

  // Question & Solution Start
  AllQuestions: async (_parents, _args, _context) => {
    const questions = await prisma.question.findMany();
    return questions;
  },

  HomepageQuestions: async (_parents, _args, _context) => {
    const questions = await prisma.question.findMany({
      take: 5,
      orderBy: {
        date: "desc",
      },
    });
    return questions;
  },

  SortQuestionsByTime: async (_parents, _args, _context) => {
    const questions = await prisma.question.findMany({
      orderBy: {
        date: "desc",
      },
    });
    return questions;
  },

  SortQuestionsByLike: async (_parents, _args, _context) => {
    const questions = await prisma.question.findMany({
      orderBy: {
        likes: {
          _count: "desc",
        },
      },
    });
    return questions;
  },

  AllQuestionComments: async (_parents, _args, _context) => {
    const questionComments = await prisma.questionComment.findMany();
    return questionComments;
  },

  AllLikedQuestions: async (_parents, args: { likerId: number }, _context) => {
    const likerId = args.likerId;
    const likes = await prisma.likedQuestion.findMany({
      where: {
        likerId: likerId,
      },
    });

    const likedQuestionIds = likes.map((like) => {
      return like.questionId;
    });
    const likedQuestions = await prisma.question.findMany({
      where: {
        id: {
          in: likedQuestionIds,
        },
      },
    });
    return likedQuestions;
  },

  AllLikedQuestionComments: async (
    _parents,
    args: { likerId: number },
    _context,
  ) => {
    const likerId = args.likerId;
    const likes = await prisma.likedQuestionComment.findMany({
      where: {
        likerId: likerId,
      },
    });

    const likedQuestionCommentIds = likes.map((like) => {
      return like.questionCommentId;
    });
    const likedQuestionComments = await prisma.questionComment.findMany({
      where: {
        id: {
          in: likedQuestionCommentIds,
        },
      },
    });
    return likedQuestionComments;
  },

  AllSolutions: async (_parents, _args, _context) => {
    const solutions = await prisma.solution.findMany();
    return solutions;
  },

  AllSolutionComments: async (_parents, _args, _context) => {
    const solutionComments = await prisma.solutionComment.findMany();
    return solutionComments;
  },

  AllLikedSolutions: async (_parents, args: { likerId: number }, _context) => {
    const likerId = args.likerId;
    const likes = await prisma.likedSolution.findMany({
      where: {
        likerId: likerId,
      },
    });

    const likedSolutionIds = likes.map((like) => {
      return like.solutionId;
    });
    const likedSolutions = await prisma.solution.findMany({
      where: {
        id: {
          in: likedSolutionIds,
        },
      },
    });
    return likedSolutions;
  },

  AllLikedSolutionComments: async (
    _parents,
    args: { likerId: number },
    _context,
  ) => {
    const likerId = args.likerId;
    const likes = await prisma.likedSolutionComment.findMany({
      where: {
        likerId: likerId,
      },
    });

    const likedSolutionCommentIds = likes.map((like) => {
      return like.solutionCommentId;
    });
    const likedSolutionComments = await prisma.solutionComment.findMany({
      where: {
        id: {
          in: likedSolutionCommentIds,
        },
      },
    });
    return likedSolutionComments;
  },

  // Question & Solution end
};

export { Query };
