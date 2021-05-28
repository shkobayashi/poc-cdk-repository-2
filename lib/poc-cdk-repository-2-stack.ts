import { Vpc } from '@aws-cdk/aws-ec2';
import { Code, Function, Runtime } from '@aws-cdk/aws-lambda';
import { Bucket } from '@aws-cdk/aws-s3';
import * as cdk from '@aws-cdk/core';

export class PocCdkRepository2Stack extends cdk.Stack {
  constructor(scope: cdk.Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    let vpcid = process.env.VPC_ID;
    const vpc = Vpc.fromLookup(this, 'VPC', {vpcId: vpcid});

    const fn = new Function(this, 'MyFunction', {
      runtime: Runtime.NODEJS_12_X,
      handler: 'index.handler',
      code: Code.fromInline('exports.handler = function(event, ctx, cb) { console.log("Hello") }'),
      vpc: vpc
  });
  }
}
