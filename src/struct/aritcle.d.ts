

declare namespace Aritcle {

  /**
   * 文章 struct
   */
  interface AritcleStruct {
    articleTitle?: string
    articleExplain?: string
    articleTags?: string
    articleCategoryId?: number | null,
    articleCategoryName?: string,
    articleContent?: string,
    articleImg?: string,
    isTop?: boolean,
    isPrivate?: boolean,
    author?: string,
    isExternalLink?: boolean,
    externalLinkUrl?: string,
    isRelease?: boolean,
  }

}