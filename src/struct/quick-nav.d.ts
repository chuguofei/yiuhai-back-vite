

declare namespace QuickNav {

    interface QuickNavType {
        id?: number | string,
        name?: string
    }

    interface QuickNav extends Base.Page {
        id?: number | string,
        name?: string,
        icon?: string,
        href?: string,
        typeId?: number,
        navTypeId?: number,
        navTypeName?: string
    }
}