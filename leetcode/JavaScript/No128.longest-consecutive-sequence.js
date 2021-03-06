/**
 * Difficulty:
 * Hard
 *
 * Desc:
 * Given an unsorted array of integers,
 * find the length of the longest consecutive elements sequence.
 *
 * Example:
 * Given [100, 4, 200, 1, 3, 2],
 * The longest consecutive elements sequence is [1, 2, 3, 4]. Return its length: 4.
 * Your algorithm should run in O(n) complexity.
 *
 * 找出乱序的数组中可拼成的最长连续值的范围
 * 给定一个未排序的整数数组，找出最长连续序列的长度。
 * 要求算法的时间复杂度为 O(n)
 */

/**
 * @param {number[]} nums
 * @return {number}
 */
var longestConsecutive_1 = function(nums) {
  if (!nums.length) return 0

  const arr = [...new Set(nums)]
  arr.sort((a, b) => a - b)

  let pre = arr[0]
  let max = 1
  let currentMax = 1
  for (let i = 1; i < arr.length; i += 1) {
    const num = arr[i]
    if (num - pre === 1) {
      currentMax += 1
    } else {
      if (currentMax > max) max = currentMax
      currentMax = 1
    }
    pre = num
  }
  if (currentMax > max) max = currentMax
  return max
}

/**
 * @param {number[]} nums
 * @return {number}
 */
var longestConsecutive_2 = function(nums) {
  // 记录某个值所对应的最大长度
  const tmp = {}
  let result = 0

  for (const num of nums) {
    if (tmp[num]) continue
    tmp[num] = 1

    if (tmp[num - 1]) {
        tmp[num] += tmp[num - 1]
    }
    if (tmp[num + 1]) {
      let index = num + 1
      while (tmp[index]) index += 1
      index -= 1
      tmp[index] += tmp[num]
      result = Math.max(tmp[index], result)
    }

    result = Math.max(result, tmp[num])
  }
  return result
}

/**
 * @param {number[]} nums
 * @return {number}
 */
var longestConsecutive_3 = function(nums) {
  const tmp = {}
  let result = 0

  const getFirst = (index) => {
    while (tmp[index]) {
      index -= 1
    }
    return index + 1
  }

  for (const num of nums) {
    if (tmp[num]) continue
    tmp[num] = {
      last: num,
      len: 1
    }

    if (!tmp[num - 1] && !tmp[num + 1]) {
      result = Math.max(result, 1)
      continue
    }

    let first = null
    if (tmp[num - 1]) {
      tmp[num].len = tmp[num - 1].len + tmp[num].len
      result = Math.max(result, tmp[num].len)

      first = getFirst(num - 1)
      tmp[first].last = num
    }

    if (tmp[num + 1]) {
      const last = tmp[num + 1].last
      tmp[last].len = tmp[last].len + tmp[num].len

      if (first !== null) {
        tmp[first].last = last
      } else {
        tmp[num].last = last
      }
      result = Math.max(result, tmp[last].len)
    }
  }

  return result
}
