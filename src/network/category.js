import { request } from './request'

export function getCategoryInfoList() {
  return request({
    url: '/category',
  })
}

export function getDetailCategory(maitKey) {
  return request({
    url: '/subcategory',
    params: {
      maitKey,
    },
  })
}

export function getRecommendGoods(miniWallkey, type) {
  return request({
    url: '/subcategory/detail',
    params: {
      miniWallkey,
      type,
    },
  })
}
