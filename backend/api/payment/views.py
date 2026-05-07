from django.shortcuts import render
from django.http import HttpResponse, JsonResponse
from django.contrib.auth.decorators import login_required
from django.contrib.auth import get_user_model
from django.views.decorators.csrf import csrf_exempt
from api.order.models import Order 

import braintree


gateway = braintree.BraintreeGateway(
  braintree.Configuration(
      braintree.Environment.Sandbox,
      merchant_id="5vjhsbct9sktfhvy",
      public_key="prhrh3rsvrnhkyc2",
      private_key="76853eb09b90d712350b9a57ddd40b76"
  )
)

def validate_user_session(id, token):
    UserModel = get_user_model()

    try:
        user = UserModel.objects.get(pk=id)
        if user.session_token == token:
            return True
        return False
    except UserModel.DoesNotExist:
        return False
@csrf_exempt
def process_payment(request, id, token):

    if not validate_user_session(id, token):
        return JsonResponse({
            'error': 'Invalid session, Please laogin again!'
        })

    nonce_from_the_client = request.POST.get("paymentMethodNonce")
    amount_from_the_client = request.POST.get("amount")

    result = gateway.transaction.sale({
        "amount": amount_from_the_client,
        "payment_method_nonce": nonce_from_the_client,
        "options": {
            "submit_for_settlement": True
        }
    })

    if result.is_success:

        User = get_user_model()
        user = User.objects.get(pk=id)

        # ✅ FIXED INDENTATION
        Order.objects.create(
            user=user,
            product_name="Test Product",
            total_product=1,
            transaction_id=result.transaction.id,
            total_amount=result.transaction.amount
        )

        return JsonResponse({
            "success": result.is_success,
            "transaction_id": result.transaction.id,
            "transaction_amount": result.transaction.amount
        })

    else:
        return JsonResponse({
            'error': True,
            'success': False
        })