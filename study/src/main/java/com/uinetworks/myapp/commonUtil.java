package com.uinetworks.myapp;

public class commonUtil {
	public pagingVo pagingParamSetting(int totalCnt, int curPageCnt) {
		
		int PAGE_LIST_CNT = 15;
		
		//================페이징 파라메터 시작=======================
		int rowCnt = PAGE_LIST_CNT;
		int totalPageCnt = ((totalCnt/rowCnt)+1);
		//System.out.println("현재페이지 " + (vo.getCur_page()) + " / 시작 줄 : " + ((vo.getCur_page()-1) * vo.getPage_list_cnt()) );
		//System.out.println("총데이터갯수 " + totalCnt + " / 총페이지 : " + ((totalCnt/rowCnt)+1));
		int startRowCnt = (((curPageCnt - 1) / 10) * 10 + 1);
		int endRowCnt = startRowCnt + 10 - 1; 
		

		if(totalPageCnt < 10){
			endRowCnt = totalPageCnt;
		}else if(endRowCnt > totalPageCnt){
			endRowCnt = totalPageCnt;
		}
		
		//System.out.println("startRow : " + startRow);
		//System.out.println("endRow : " + endRow);
		
		pagingVo resultVo = new pagingVo();
		
		resultVo.setStartRowCnt(startRowCnt);
		resultVo.setEndRowCnt(endRowCnt);
		resultVo.setTotalRowCnt(totalCnt);
		resultVo.setTotalPageCnt(totalPageCnt);
		resultVo.setCurPageCnt(curPageCnt);
		
		//vo.setS_row((curPageCnt-1) * PAGE_LIST_CNT);
		//================페이징 파라메터 끝=======================
		
		return resultVo;
	}
}
