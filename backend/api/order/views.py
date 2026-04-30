from rest_framework import viewsets
from django.http import JsonResponse 
from django.contrib.auth import get_user_model
from.serializers import OrderSerializer
from .models import Order
from django.views.decorators.csrf import csrf_exempt

# Create your views here.
def validate_user_session(id,token):
    UserModel = get_user_model()
    try:
        user = UserModel.objects.get(pk=id)
        if user.session_token == token:
            return True
        return False
    except UserModel.DoesNotExist:
        return False
    

@csrf_exempt
def add(request, id, token):
    if not validate_user_session(id, token):
        return JsonResponse({'error': 'Please re-login', 'code':1})
    
    if request.method == "POST":
        user_id= id
         # ✅ FIXED: safe access (no crash if missing)
        transaction_id = request.POST.get('transaction_id')
        amount = request.POST.get('amount')
        products = request.POST.get('products')

        # ✅ FIXED: handle missing data
        if not transaction_id or not amount or not products:
            return JsonResponse({'error': 'Missing required fields'})

        # ✅ FIXED: safe product count
        try:
            total_pro = len(products.split(',')[:-1])
        except:
            return JsonResponse({'error': 'Invalid products format'})
        UserModel = get_user_model()

        try:
            user = UserModel.objects.get(pk=user_id)
        except UserModel.DoesNotExist:
            return JsonResponse ({'error': 'user does not exists'})
        
        ordr = Order(user=user, product_name=products, total_product=total_pro, transaction_id = transaction_id,  total_amount=amount)
        ordr.save()
        return JsonResponse({'success': True, 'error': False, 'msg': 'order place successfully'})
    
class OrderViewSet(viewsets.ModelViewSet):
    queryset=Order.objects.all().order_by("id")
    serializer_class = OrderSerializer
        


