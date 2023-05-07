import { FlowUsClient } from '@flowusx/flowus-client'
import { FlowUsToMarkdown } from '@flowusx/flowus-to-md'
import * as fs from 'fs'
const flowUsClient = new FlowUsClient()
const flowUsToMd = new FlowUsToMarkdown({ client: flowUsClient })
const genMd = async () => {
  // const pageBlocks = await flowUsClient.getPageBlocks('279f6935-4103-4d64-9b11-ec588fc0b51b')
  // const mdString = flowUsToMd.toMarkdownString(pageBlocks)
  const mdString = await flowUsToMd.pageToMarkdown('279f6935-4103-4d64-9b11-ec588fc0b51b')

  fs.writeFileSync('./flowus.md', mdString)
}

genMd()
