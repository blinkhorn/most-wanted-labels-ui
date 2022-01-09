from typing import Dict
from aws_lambda_powertools import Logger
from aws_lambda_powertools.event_handler.api_gateway import ApiGatewayResolver, CORSConfig
from aws_lambda_powertools.utilities.typing import LambdaContext

import record_labels.record_labels as record_labels

logger = Logger()
cors_config = CORSConfig(allow_origin="https://main.dfmbhbzhj99lp.amplifyapp.com", allow_credentials=True)
app = ApiGatewayResolver(cors=cors_config)

app.include_router(record_labels.router, prefix="/api/record-labels")


def lambda_handler(event: Dict, context: LambdaContext):
    return app.resolve(event, context)
