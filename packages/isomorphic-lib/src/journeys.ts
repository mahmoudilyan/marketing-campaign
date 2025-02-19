import { JourneyBodyNode, JourneyDefinition, JourneyNodeType } from "./types";

function nodeToSegments(node: JourneyBodyNode): string[] {
  switch (node.type) {
    case JourneyNodeType.SegmentSplitNode: {
      return [node.variant.segment];
    }
    case JourneyNodeType.ExperimentSplitNode:
      return [];
    case JourneyNodeType.RateLimitNode:
      return [];
    case JourneyNodeType.MessageNode:
      return [];
    case JourneyNodeType.DelayNode:
      return [];
    case JourneyNodeType.WaitForNode:
      return node.segmentChildren.map((c) => c.segmentId);
  }
}

/**
 * Returns the set of segments that this journey depends on.
 * @param definition
 * @returns
 */
export function getSubscribedSegments(
  definition: JourneyDefinition
): Set<string> {
  const subscribedSegments = new Set<string>();
  subscribedSegments.add(definition.entryNode.segment);
  for (const node of definition.nodes) {
    const segments = nodeToSegments(node);
    for (const segment of segments) {
      subscribedSegments.add(segment);
    }
  }
  return subscribedSegments;
}
