import { describe, it, expect } from "vitest"

import { mount } from "@vue/test-utils"
import Header from "@/components/HeaderPage.vue"

describe("Header", () => {
  it("mounts renders properly", () => {
    const wrapper = mount(Header)
    expect(wrapper.text()).toContain("My Header")
  })
})
