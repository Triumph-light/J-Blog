import {NextPage} from "next"
import Image from "next/image"
import styles from "./NavBar.module.scss"
import React, {useContext, useEffect, useState} from "react"
import {ThemeContext} from "@/stores/theme"
import {Themes} from "@/constants/enum"
import {usePathname} from "next/navigation"

export interface INavBarItemProps {
    id: number
    name: string
    url: string,
    className: string
}

export interface INavBarProps {
    NavData: INavBarItemProps[]
}

const NavBar: NextPage<INavBarProps> = ({NavData}) => {

    const [MobileNav, setMobileNav] = useState<boolean>(false)
    const [IsHide, setIsHide] = useState<boolean>(false)
    const {theme, setTheme} = useContext(ThemeContext)
    const [searchQuery, setSearchQuery] = useState<string>("")
    const [IsFocus, setIsFocus] = useState<boolean>(false)
    const [IsActive, setIsActive] = useState<boolean>(false)
    const pathname = usePathname()
    //点击搜索按钮
    const handleSearch = (): void => {
        console.log(searchQuery)
    }
    const handleSearchInput = (e: React.ChangeEvent<HTMLInputElement>): void => {
        setSearchQuery(e.target.value)
    }
    const handleClick = (e: MouseEvent) => {
        if (!e.target) return
        const target = e.target as HTMLElement
        if (target.classList.value.indexOf("more") === -1) {
            setIsActive(false)
        }
        if (target.classList.value.indexOf("phone_show_menu") === -1) {
            setMobileNav(false)
        }
    }
    useEffect(() => {
        document.addEventListener("scroll", handlerScroll)
        document.addEventListener("click", handleClick)

        return () => {
            document.removeEventListener("click", handleClick)
            document.addEventListener("scroll", handlerScroll)
        }
    })
    // 滚动事件处理函数
    const handlerScroll = () => {
        const scrollTop =
            document.documentElement.scrollTop || document.body.scrollTop
        if (scrollTop > 446) {
            setIsHide(true)
        } else {
            setIsHide(false)
        }
    }


    return (
        <header className={`${styles.main_header} ${!IsHide ? styles.visible : ''}`}>
            <div className={styles.container}>
                <a href="https://juejin.cn/" className={styles.logo_wrap}>
                    <div className={styles.logo}/>
                    <div className={styles.title}>稀土掘金</div>
                </a>
                <nav role="navigation" className={styles.main_nav}>
                    <ul className={styles.nav_list}>
                        <li className={styles.main_nav_list}>
                            <div className={`${styles.phone_show_menu} ${styles.isResourceVisible}`}
                                 onClick={(e) => {
                                     e.stopPropagation()
                                     setMobileNav(!MobileNav)
                                 }
                                 }
                            >
                                <span>首页</span>
                                <svg width="12" height="12" viewBox="0 0 12 12"
                                     fill="none" xmlns="http://www.w3.org/2000/svg"
                                     className={`${styles.mobile_menu_icon} ${MobileNav ? styles.active : ''}`}

                                >
                                    <path
                                        d="M2.45025 4.82431C2.17422 4.49957 2.40501 4.00049 2.83122 4.00049H9.16878C9.59498 4.00049 9.82578 4.49957 9.54975 4.82431L6.38097 8.55229C6.1813 8.78719 5.8187 8.78719 5.61903 8.55229L2.45025 4.82431Z"/>
                                </svg>
                            </div>
                            <ul className={`${styles.phone_hide} ${MobileNav ? styles.show : ''}`}>
                                {
                                    NavData.map((item) => {
                                        return (
                                            <li key={item.id}
                                                className={`${styles.nav_item} ${styles.link_item}   ${
                                                    pathname === item.url ? styles.active : ""
                                                }`}>
                                                <a href={item.url}>{item.name}</a>
                                            </li>
                                        )
                                    })
                                }
                                <nav className={`${styles.nav_item} ${styles.link_item}`}>
                                    <a
                                        href="https://detail.youzan.com/show/goods/newest?kdt_id=104340304"
                                        target="_blank"
                                        className={`${styles.nav_item} ${styles.link_item} ${styles.no_border}`}
                                        rel="noreferrer"><span
                                    >商城</span></a>
                                </nav>
                                <nav
                                    className={`${styles.nav_item} ${styles.link_item} ${styles.download_icon} ${styles.isResourceVisible}`}>
                                    <a
                                        href="https://juejin.cn/app?utm_source=jj_nav"
                                        target="_blank"
                                        className={`${styles.download_app} ${styles.no_border} `}
                                        rel="noreferrer">
                                        APP
                                    </a>
                                    <span className={styles.tablead}>邀请有礼</span>
                                </nav>
                                <nav className={styles.nav_item}><a
                                    href="https://juejin.cn/extension?utm_source=jj_nav" target="_blank"
                                    rel="nofollow noopener noreferrer"
                                    className={styles.broswer_extension}><span
                                >插件</span></a></nav>
                                <li className={styles.nav_item}><a
                                    target="_blank"
                                    href="https://juejin.cn/report2022/mobile?utm_source=daohang"
                                    className={styles.activity} rel="noreferrer">
                                    <Image src="/年度报告.image" alt="123" width={115} height={40}/>
                                </a>
                                </li>
                            </ul>
                        </li>
                        <ul className={styles.right_side_nav}>
                            <li className={styles.search_add}>
                                <ul className={styles.search_add_ul}>
                                    <li className={`${styles.nav_item} ${styles.search}`}>
                                        <form role="search"
                                              className={`${styles.search_form} ${IsFocus ? styles.active : ''}`}>
                                            <input
                                                type="search"
                                                placeholder="探索稀土掘金"
                                                className={styles.search_input}
                                                onBlur={() => setIsFocus(false)}
                                                onFocus={() => setIsFocus(true)}
                                            />

                                            <div className={styles.search_icon_container}>
                                                <Image className={styles.search_icon} src="/search.svg"
                                                       width={16} height={16} alt="123"/>
                                            </div>
                                            <div className={styles.typehead}>
                                                <div className={styles.search_annual}>
                                                    {/*<Image className={styles.search_annual_img} src="pub" alt="123"></Image>*/}
                                                    <span
                                                        className={styles.search_annual_txt}>开启我的2022年度报告</span>
                                                </div>
                                                <div className={styles.title}>
                                                    <span>搜索历史</span>
                                                    <span className={styles.clear}>清空</span></div>
                                                <div className={styles.list}>
                                                    <div>青训营
                                                    </div>
                                                    <div>
                                                        next
                                                    </div>
                                                    <div>nextjs</div>
                                                    <div>
                                                        node
                                                    </div>
                                                    <div>
                                                        nodejs
                                                    </div>
                                                    <div>
                                                        青训营笔记
                                                    </div>
                                                </div>
                                            </div>
                                        </form>
                                    </li>
                                    <li className={`${styles.nav_item} ${styles.add} ${IsFocus ? styles.hide : ''}`}>
                                        <div className={styles.add_group}>
                                            <button
                                                className={`${styles.add_btn} ${IsFocus ? styles.hide : ''}`}>
                                                创作者中心
                                            </button>
                                            <div className={styles.more}
                                                 onClick={(e) => {
                                                     e.stopPropagation()//由于添加document时间会冒泡，所以需要阻止冒泡，或者把子元素添加一遍more className
                                                     setIsActive(!IsActive)
                                                 }}
                                            >
                                                <svg width="12" height="12"
                                                     viewBox="0 0 12 12" fill="none"
                                                     xmlns="http://www.w3.org/2000/svg"
                                                     className={` ${styles.unfold12_icon} ${!IsActive ? styles.active : ''}`}>
                                                    <path
                                                        d="M2.45025 4.82383C2.17422 4.49908 2.40501 4 2.83122 4H9.16878C9.59499 4 9.82578 4.49908 9.54975 4.82382L6.38097 8.5518C6.1813 8.7867 5.8187 8.7867 5.61903 8.5518L2.45025 4.82383Z"
                                                        fill="white"/>
                                                </svg>
                                            </div>
                                            <ul className={`${styles.more_list} ${IsActive ? styles.active : ''}`}>
                                                <li className={styles.item}><span
                                                    className={`${styles.icon} ${styles.write_article}`}>写文章</span>
                                                </li>
                                                <li className={styles.item}><span
                                                    className={`${styles.icon} ${styles.issue_points}`}>发沸点</span>
                                                </li>
                                                <li className={styles.item}><span
                                                    className={`${styles.icon} ${styles.write_book}`}>写笔记</span>
                                                </li>
                                                <li className={styles.item}><span
                                                    className={`${styles.icon} ${styles.create_code}`}>写代码</span>
                                                </li>
                                                <li className={styles.item}><span
                                                    className={`${styles.icon} ${styles.write_note}`}>草稿箱</span>
                                                </li>
                                            </ul>
                                        </div>
                                    </li>
                                </ul>
                            </li>
                            <li className={`${styles.nav_item} ${styles.vip_entry}`}>
                                <div className={styles.vip_title}>
                                    <div className={styles.vip_entry_img}>
                                        <Image className={styles.vip_img} src="/vip.svg" width={24} height={24}
                                               alt="vip"/>
                                    </div>
                                    <div className={styles.vip_words}>会员</div>
                                </div>
                            </li>
                            <li className={styles.nav_item}>
                                <a className={styles.app_link} href="https://juejin.cn/notification">
                                    <svg width="24" height="24" viewBox="0 0 24 24"
                                         fill="none" xmlns="http://www.w3.org/2000/svg"
                                         className={styles.notification_icon}>
                                        <path
                                            d="M6.01132 10.2856C6.28115 6.54234 8.68619 4.28564 11.9999 4.28564C15.3136 4.28564 17.7186 6.54234 17.9885 10.2856C18.1219 12.1363 18.4093 13.708 19.9473 15.8848C20.1889 16.2267 19.953 16.7142 19.5343 16.7142H4.46546C4.04679 16.7142 3.81092 16.2267 4.05252 15.8848C5.59053 13.708 5.87793 12.1363 6.01132 10.2856Z"
                                            strokeWidth="1.5" strokeLinecap="round"/>
                                        <path d="M11.9573 3.21436V4.28578" strokeWidth="3"
                                              strokeLinecap="round"/>
                                        <path
                                            d="M9.57495 18.8569C9.92795 19.8557 10.8804 20.5712 12.0001 20.5712C13.1197 20.5712 14.0722 19.8557 14.4252 18.8569H9.57495Z"
                                            strokeLinecap="round" strokeLinejoin="round"/>
                                    </svg>
                                </a>
                                <ul
                                    className={`${styles.menu_list} ${styles.notification_dropdown_menu}`}>
                                    <li className={styles.menu_item}><a
                                        href="https://juejin.cn/notification"
                                        className={styles.item_link}><span
                                        className={styles.item_name}>评论</span> </a>
                                    </li>
                                    <li className={styles.menu_item}><a
                                        href="https://juejin.cn/notification/digg"
                                        className={styles.item_link}><span
                                        className={styles.item_name}>点赞</span></a>
                                    </li>
                                    <li className={styles.menu_item}><a
                                        href="https://juejin.cn/notification/follow"
                                        className={styles.item_link}>
                                                <span
                                                    className={styles.item_name}>关注</span> </a>
                                    </li>
                                    <li className={styles.menu_item}><a
                                        href="https://juejin.cn/notification/im"
                                        className={styles.item_link}><span
                                        className={styles.item_name}>私信</span></a>
                                    </li>
                                    <li className={styles.menu_item}><a
                                        href="https://juejin.cn/notification/system"
                                        className={styles.item_link}><span
                                        className={styles.item_name}>系统消息</span> </a>
                                    </li>
                                </ul>
                            </li>
                            <li className={styles.nav_item}>
                                <div className={styles.avatar_wrapper}>
                                    <div className={styles.avatar}>
                                        <Image className={styles.avatarImg} src="/avatar.awebp" alt="123"
                                               width={40} height={40}
                                        />
                                    </div>
                                </div>
                            </li>
                        </ul>
                    </ul>
                </nav>
            </div>
        </header>
    )
}
export default NavBar
