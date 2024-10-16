import { find, isEmpty, isUndefined, range, reverse, sortBy, sumBy, uniq } from 'lodash'
import data from './data/data';

function reduce(getter, filter, flatMap, flatMapFilter) {
  return data
  	.filter(filter)
  	.flatMap(flatMap)
  	.filter(flatMapFilter)
  	.reduce(
	    (acc, current) => {
	      const name = getter(current)
	      if (isUndefined(name) || isEmpty(name + '')) {
	        return acc
	      }
	      if (!find(acc, item => item.name === name)) {
	        acc.push({ name, totaal: 0})
	      }
	      find(acc, item => item.name === name).totaal++
	      return acc
	    },
	    []
	  )
}

export function reduceAndSortByName({
	getter = item => item,
	filter = item => true,
	flatMap = item => [item],
	flatMapFilter = item => true
}) {
	return sortBy(reduce(getter, filter, flatMap, flatMapFilter), ['name'])
}

export function reduceAndSortByCount({
	getter = item => item,
	filter = item => true,
	flatMap = item => [item],
	flatMapFilter = item => true
}) {
	return reverse(sortBy(reduce(getter, filter, flatMap, flatMapFilter), ['totaal']))
}

export function getAllServices() {
	return uniq(data.flatMap(item => item.services).map(service => service.name)).sort()
}

export const getMedian = data => {
  if (isEmpty(data)) {
    return 0
  }
  const flattened = data.flatMap(item => range(item.totaal).map(() => item.name))
  return flattened[Math.floor(flattened.length / 2)]
}

export const getAverage = data => {
  if (isEmpty(data)) {
    return 0
  }
  const sum = sumBy(data, item => item.name * item.totaal)
  const totalCount = sumBy(data, 'totaal')
  return Math.floor(sum / totalCount)
}
