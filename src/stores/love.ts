import { ref } from 'vue'
import { defineStore } from 'pinia'

export const useLoveStore = defineStore('love', () => {
    const list = ref<Array<{
        pkg: string,
        url: string,
        cover: string,
        title: string,
    }>>(JSON.parse(localStorage.getItem("love") as string) ?? [])
    const love = (bangumi: any) => {
        if (exist(bangumi)) {
            return
        }
        list.value.unshift(bangumi)
        localStorage.setItem("love", JSON.stringify(list.value))
        save()
    }
    const unlove = (bangumi: any) => {
        list.value.splice(find(bangumi), 1)
        save()
    }
    const save = () => {
        localStorage.setItem("love", JSON.stringify(list.value))
    }
    const find = (bangumi: any) => {
        return list.value.findIndex((e) => e.pkg == bangumi.pkg && e.url == bangumi.url)
    }
    const exist = (bangumi: any) => {
        return find(bangumi) != -1
    }
    const loveOrUnLove = (bangumi: any) => {
        if (exist(bangumi)) {
           unlove(bangumi)
        } else {
            love(bangumi)
        }
    }
    return {
        unlove,
        love,
        find,
        exist,
        loveOrUnLove,
        list
    }
})