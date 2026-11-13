# Mapa de linhas do código (gerado por ferramentas/mapa.mjs, não edite à mão)

Gerado em 13/11/2026, 01:02:43. Procure aqui com Grep e leia só as linhas indicadas.
Formato: `linha: nome`. O guia por assunto está em GUIA-CODIGO.md.

## index.html (12842 linhas)

16: <!-- Tailwind CSS compilado (sem observador em tempo real para toque instantâneo) -->
18: <!-- Font Awesome Icons -->
20: <!-- PDF.js para renderizar PDFs -->
22: <!-- pdf-lib para gerar contratos em A4 profissional -->
24: <!-- Gera o QR code do Pix a partir do copia e cola -->
26: <!-- Supabase (banco de dados online) -->
142: <!-- Sistema de design do MOTORA: cores, tipografia e componentes -->
147: <!-- Header Principal -->
161: <!-- Controles do Header -->
163: <!-- Botão Status Online/Offline (Motorista) -->
171: <!-- Ativar Notificações -->
176: <!-- Temas -->
181: <!-- Logout Button -->
190: <!-- Conteúdo Principal -->
193: <!-- TELA DE LOGIN -->
194: #secLogin
227: <!-- ESCOLHA DA DEMONSTRAÇÃO (login teste / teste) -->
228: #secDemoEscolha
243: <!-- TELA PÚBLICA DE ASSINATURA OFICIAL VIA GOV.BR (?assinar=token) -->
244: #secGovBrInvite
258: <!-- PAINEL DO MOTORISTA -->
259: #secDriverPanel
261: <!-- Card do Veículo Vinculado -->
275: <!-- Renderizado via JS: Status "Em dia" ou "Em atraso" -->
285: <!-- Botão "Instalar app" (só aparece em celular Android, fora do próprio app) -->
290: <!-- Aviso: nova versão do app Android -->
293: <!-- Aviso vermelho: notificações desligadas -->
296: <!-- Aviso vermelho: CNH vencida (com botão para enviar a nova) -->
300: <!-- Aviso de Pix / pagamento pendente -->
303: <!-- Navegação de Abas -->
321: <!-- Conteúdo das Abas Motorista -->
324: <!-- Aba CRLV-e -->
325: #tabDrvCrlv
330: <!-- Renderizado dinamicamente -->
334: <!-- Aba Contrato -->
335: #tabDrvContract
345: <!-- Renderizado dinamicamente -->
349: <!-- Aba Vistoria -->
350: #tabDrvInspection
357: <!-- Aba Pagamento -->
358: #tabDrvPayment
371: <!-- Caução e multas do motorista -->
373: <!-- Valor e descrição da cobrança -->
383: <!-- Seção Pix -->
397: <!-- QR Code Renderizado aqui -->
430: <!-- Seção Upload de Comprovante -->
447: <!-- Lista de comprovantes -->
452: <!-- Recibos quando o contrato está encerrado -->
459: <!-- PAINEL MASTER (ADMINISTRAÇÃO) -->
460: #secMasterPanel
500: <!-- Aviso: falta criar a tabela dos termos no banco -->
503: <!-- SUB-ABA: GESTÃO DE VEÍCULOS -->
505: <!-- Lista de Veículos -->
521: <!-- Renderizado via JS -->
528: <!-- Form de Adicionar Veículo -->
575: <!-- SUB-ABA: CONTRATOS DE LOCAÇÃO E VISTORIAS -->
675: <!-- SUB-ABA: GESTÃO DE MOTORISTAS -->
681: <!-- Lista de Motoristas (sem moldura: os cartões já são a moldura) -->
686: <!-- Cartões dos motoristas: renderizados em renderMasterPanel (cartão curto + "Mais ações") -->
691: <!-- Fichas Arquivadas (após marcar caução pago) -->
700: <!-- Form de Adicionar Motorista -->
795: <!-- Barra de baixo do dono (só no design novo) -->
806: <!-- MODAL PRIMEIRO LOGIN -->
807: #modalFirstLogin
841: <!-- MODAL OBRIGATÓRIO: ATIVAR NOTIFICAÇÕES (MOTORISTA) -->
842: #modalNotif
855: <!-- MODAL VISTORIA (MASTER) -->
856: #modalInspection
869: <!-- MODAL CONFIGURAÇÕES (MASTER) -->
870: #modalSettings
1003: <!-- MODAL TEMAS -->
1004: #modalThemes
1015: <!-- MODAL DADOS DE ACESSO DO MOTORISTA NOVO -->
1016: #modalCreds
1031: <!-- JANELA DE CONFIRMAÇÃO DO APP (substitui confirm/prompt do navegador; ver uiDialogo) -->
1046: <!-- MODAL FICHA DO MOTORISTA (MASTER) -->
1047: #modalDriverFile
1089: <!-- CONTRATO DE LOCAÇÃO (rental_contracts + ações) -->
1093: <!-- ENCERRAMENTO DE CONTRATO (profiles.pix_extra.contrato_encerrado) -->
1122: <!-- CAUÇÃO do motorista (guardada em profiles.pix_extra.caucao) -->
1137: <!-- MULTAS E OUTRAS DESPESAS a pagar pelo motorista (profiles.pix_extra.multas) -->
1179: <!-- MODAL CONTROLE FINANCEIRO (MASTER) -->
1180: <!-- RECIBO DE PAGAMENTO (MASTER -> motorista pelo WhatsApp) -->
1181: #modalRecibo
1200: <!-- ÁREA DO PIX (MASTER): escolhe o motorista e envia, edita ou exclui o Pix -->
1201: #modalPixArea
1217: <!-- ÁREA IA (MASTER): mensagens de WhatsApp prontas para cada aviso enviado ao motorista -->
1218: #modalIA
1300: <!-- MEUS RECIBOS (motorista): todos os recibos pagos, cada um em PDF -->
1301: <!-- TROCAR MINHA SENHA (motorista e dono) -->
1302: #modalEditVeh
1339: #modalSenha
1361: #modalMeusRecibos
1379: <!-- E-MAIL: a IA escreve, o dono confere e só então envia (sai pela conta Google do dono) -->
1380: #modalEmail
1400: <!-- RELATÓRIO DO FINANCEIRO (segue o período e os filtros escolhidos) -->
1401: #modalReport
1416: #modalFinCardDetail
1429: #modalFinance
1462: <!-- FILTROS -->
1512: <!-- DESPESAS DO APLICATIVO (gasolina, alimentação...) -->
1532: <!-- MODAL DESPESAS DO VEÍCULO (MASTER) -->
1533: #modalExpenses
1568: <!-- MODAL NOVO PIX -->
1569: #modalNewPix
1621: <!-- VALORES DA COBRANÇA: aluguel do carro (automático) + acréscimo − desconto -->
1679: <!-- CORRIGIR RECIBO: muda só o texto e o período; valor e comprovante não mudam -->
1680: #modalCorrigirRecibo
1694: <!-- MODAL WIZARD DE CONTRATO DE LOCAÇÃO -->
1695: #modalContractWizard
1711: <!-- Seleção Motorista & Veículo -->
1723: <!-- Locador -->
1744: <!-- Locatário -->
1765: <!-- Veículo -->
1788: <!-- Configuração Comercial -->
1865: <!-- Cláusulas editáveis -->
1877: <!-- Prévia -->
1891: <!-- MODAL DETALHE, ASSINATURAS E HISTÓRICO DO CONTRATO -->
1892: #modalContractDetail
1905: <!-- MODAL GERADOR DE TERMO DE VISTORIA (ENTREGA E DEVOLUÇÃO) -->
1906: #modalInspectionTerm
1967: <!-- Fotos da vistoria (lote + reuso + análise IA + confirmação obrigatória de avarias) -->
1990: <!-- Resumo de Avarias Confirmadas + Checklist Bilateral + Ressalvas -->
2030: <!-- MODAL DETALHE E ASSINATURAS DO TERMO DE VISTORIA -->
2031: #modalInspectionTermDetail
2044: <!-- MODAL CONFIRMAÇÃO DE DANO DETECTADO PELA IA (OBRIGATÓRIO ANTES DE NOMEAR) -->
2045: #modalInspDamageConfirm
2060: <!-- MODAL VISUALIZADOR DE DOCUMENTOS/COMPROVANTES -->
2061: #modalDocViewer
2069: #modalDocBody
2070: <!-- Conteúdo pré-visualizado -->
2076: #modalTerms
2090: <!-- NOTIFICAÇÕES TOAST -->
2107: lsGet()
2108: lsSet()
2109: lsDel()
2132: demoLoginRole()
2136: demoId()
2137: demoSave()
2138: demoSaved()
2140: *datas no horário de Brasília*
2141: demoLocal()
2142: demoParts()
2143: demoDay()
2144: demoNextDue()
2149: *dados fictícios (4 meses)*
2150: demoBuild()
2368: *documentos fictícios (imagem gerada na hora)*
2369: *documentos e fotos fictícios (desenhados na hora; campos com AAAA/0000 e tarja "NÃO É REAL")*
2370: demoDocBlob()
2448: *"banco de dados" na memória, com a mesma forma de uso do Supabase*
2449: demoQuery()
2472: out()
2478: run()
2519: demoOnUpdate()
2529: demoOnInsert()
2641: demoClient()
2831: demoStart()
2839: demoStop()
2845: abrirDemo()
2852: trocarDemo()
2857: demoBanner()
2872: toEmail()
2876: showLogin()
2880: esc()
2885: dataHoraBR()
2893: uiDialogo()
2941: uiConfirm()
2950: uiPrompt()
2956: friendlyError()
2966: devicePrefs()
2969: saveDevicePrefs()
2972: docRef()
2973: viewDocIdx()
2975: setBusy()
3018: **TEMAS**
3027: currentTheme()
3032: applyTheme()
3033: openThemes()
3043: pickTheme()
3049: toggleDarkMode()
3051: **DESIGN NOVO / ANTIGO (escolhido pelo dono; o dos motoristas fica no banco e vale para todos)**
3053: loadDesignCfg()
3060: applyDesign()
3077: markMasterNav()
3084: fillDesignCfg()
3089: saveDesign()
3103: showToast()
3112: **TROCAR MINHA SENHA (o motorista troca a senha padrão por uma só dele)**
3113: senhaErro()
3114: abrirSenha()
3123: salvarIaCodigo()
3133: fecharSenha()
3134: salvarSenha()
3155: loginUserInput()
3160: loginErro()
3164: verSenha()
3169: handleLogin()
3218: logout()
3237: saveFirstLoginPreferences()
3260: carregarDados()
3292: aplicarDados()
3333: loadAndRender()
3360: autoRefresh()
3399: markUpdated()
3404: reload()
3409: renderApp()
3457: **MASTER ENTRA NA CONTA REAL DO MOTORISTA (sem a senha dele)**
3460: masterBack()
3462: viewAsDriver()
3484: exitViewAs()
3503: viewOnly()
3504: renderViewAsBanner()
3514: showSection()
3519: withBtn()
3527: toggleDriverStatus()
3536: isOnline()
3538: updateStatusToggleUI()
3551: **BOTÃO "INSTALAR APP" (APK) — só Android; iPhone/iPad e o próprio app não veem**
3560: checkApkUpdate()
3575: updateInstallApkButton()
3595: renderDriverPanel()
3853: switchDriverTab()
3868: **CHAVE PIX (guardada no campo pix_link como "chave:tipo|valor")**
3871: parsePixKey()
3875: normalizePixKey()
3883: pixKeyLooksOk()
3891: togglePixKeyFields()
3897: updatePixKeyPlaceholder()
3903: copyPixKey()
3910: copyPixCode()
3922: receiptBadge()
3932: receiptMasterBox()
3959: receiptAction()
3966: confirmReceipt()
3995: rejectReceipt()
4007: recheckReceipt()
4016: uploadReceipt()
4039: switchMasterTab()
4058: maskPhone()
4067: waLink()
4072: allVeh()
4073: allDrv()
4074: chargeVehicleId()
4086: enviarPedidoParcialAsaas()
4102: pedirPixParcial()
4120: restaurarPixTotal()
4126: responderPixParcial()
4150: contrato30Info()
4180: encerrarContrato()
4197: encerrarContratoPrompt()
4210: reativarContrato()
4234: marcarCaucaoPagoArquivar()
4255: desarquivarFicha()
4273: deliveryInspectionHtml()
4312: uploadDeliveryPhotos()
4339: delDeliveryPhoto()
4357: addCauDesconto()
4382: puxarMultaCaucao()
4403: delCauDesconto()
4425: dfCauDescontosHtml()
4458: dfContratoRender()
4502: encerrarContratoConfirmFicha()
4509: renderMasterPanel()
4673: renderArchivedDrivers()
4718: handleAddVehicle()
4758: deleteVehicle()
4759: cancelDeleteVehicle()
4761: confirmDeleteVehicle()
4785: abrirEditarVeiculo()
4807: evReadStoredCrlv()
4832: evReadChosenCrlv()
4848: fecharEditarVeiculo()
4849: salvarEditarVeiculo()
4886: drvCauMostra()
4893: drvCauLer()
4901: handleAddDriver()
4979: marcarSituacao()
4989: updateDriverPaymentStatus()
4998: deleteDriver()
4999: cancelDeleteDriver()
5001: confirmDeleteDriver()
5023: isImageFile()
5025: prepareFile()
5047: uploadFile()
5058: fileUrl()
5069: downloadName()
5073: renderFilePreview()
5093: renderPdfToCanvas()
5120: viewDoc()
5141: **DINHEIRO**
5142: parseMoney()
5149: fmtMoney()
5150: fmtDate()
5151: todayISO()
5153: **CONFIGURAÇÕES (Gemini e Google Drive)**
5155: loadConfigStatus()
5160: paintConfig()
5165: fillOwnerVehicleSelect()
5171: saveOwnerVehicle()
5193: locadorMerged()
5206: getLocadoresList()
5226: locadorForVehicle()
5235: fillLocadorSettings()
5255: cfgOnLocadorChange()
5256: upsertLocadorInList()
5286: deleteLocadorSetting()
5302: saveLocadorSettings()
5330: openSettings()
5345: closeSettings()
5346: saveConfig()
5356: **ASAAS (Financeiro: chave por motorista ativo + Config: conta API)**
5357: renderAsaasDrivers()
5384: toggleDriverAsaas()
5416: getAtrasoCfg()
5420: fillAtrasoCfg()
5427: saveAtrasoCfg()
5444: atrasoDataBR()
5449: atrasoPrazoUtil()
5456: calcEncargosAtraso()
5475: ehLinhaEncargo()
5476: calcAtrasoMotorista()
5506: atualizarPixAtraso()
5519: loadAsaasInfo()
5533: saveAsaas()
5541: testarAsaas()
5548: copiarAsaas()
5552: testDrive()
5559: resyncDrive()
5567: **FICHA DO MOTORISTA**
5570: openDriverFile()
5602: closeDriverFile()
5604: saveDriverFile()
5669: aiFillDriver()
5708: **CONTROLE FINANCEIRO**
5709: finRange()
5726: dayBR()
5727: inRange()
5729: onFinPeriodChange()
5735: fillFinFilters()
5743: clearFinFilters()
5747: updateFinFilterCount()
5756: openFinance()
5762: switchFinTab()
5773: finCardBtn()
5781: closeFinCardDetail()
5782: closeFinance()
5784: collectRentFinData()
5835: renderFinance()
5893: openFinCardDetail()
6100: openFinExtrato()
6194: renderFinExtratoView()
6275: openFinExtratoReport()
6292: renderFinGrafico()
6312: **E-MAIL (a IA escreve, o dono confere e confirma; sai pela conta Google do dono)**
6314: okEmail()
6316: openEmailCompose()
6337: closeEmailCompose()
6338: sendEmailCompose()
6353: emailRecibo()
6358: emailIA()
6366: **RELATÓRIO DO FINANCEIRO**
6368: finFiltersText()
6373: finPeriodText()
6380: buildReportHtml()
6402: openFinReport()
6412: closeFinReport()
6413: printFinReport()
6417: shareFinReport()
6427: emailFinReport()
6433: **DESPESAS DO VEÍCULO**
6435: openExpenses()
6447: closeExpenses()
6448: fillExpenseTypes()
6453: createExpenseType()
6468: aiReadExpense()
6500: renderExpenses()
6522: saveExpense()
6549: deleteExpense()
6578: inspSlotLabel()
6581: normalizeInspDbSlot()
6584: photoDamageBadge()
6593: photoCard()
6631: inspectionHtml()
6678: hydrateImages()
6684: openInspection()
6692: closeInspection()
6696: renderInspectionModal()
6703: uploadInspection()
6760: deleteInspectionPhoto()
6780: fmtDue()
6786: nextDueLocal()
6797: openNewPix()
6827: **CAUÇÃO DO MOTORISTA**
6828: cauOf()
6829: **DEVOLUÇÃO DO VEÍCULO: aviso com 15 dias, no máximo 2 aluguéis depois do aviso; caução e multas não são mais cobradas**
6830: devOf()
6831: devCobrancas()
6833: devPrevisao()
6841: dfDevRender()
6868: dfDevIr()
6869: dfDevSalvar()
6874: dfDevAvisar()
6880: dfDevDesfazer()
6884: dfDevReceber()
6893: **CAUÇÃO: parcela mínima de R$ 100; o que sobra vai para a última (12/11/2026, pedido do dono)**
6897: cauPlano()
6905: cauParcela()
6912: cauParcelasTexto()
6916: cauNext()
6923: dfCauFill()
6933: dfCauCalc()
6961: dfCauRead()
6974: expTypeName()
6978: driverFinVehicleId()
6990: cauEntradaItem()
7004: cauPagoDespesaItem()
7019: **CAUÇÃO: quanto já foi pago**
7021: cauStatus()
7031: obsResumoHtml()
7032: cauResumoHtml()
7037: **MULTAS E OUTRAS DESPESAS**
7038: multasOf()
7040: multaPagaAuto()
7045: multasAbertas()
7046: multasPendentes()
7047: multasResumoHtml()
7055: cobOf()
7056: dfCobFill()
7062: dfCobRead()
7065: dfCobInfo()
7075: cobResumoHtml()
7079: ajustesOf()
7083: ajusteVale()
7084: isoDia()
7086: vencProxima()
7087: previsaoProxima()
7101: previsaoHtml()
7105: dfAjRender()
7111: addAjuste()
7120: delAjuste()
7125: abrirAjustes()
7126: renderProxCobrancas()
7132: savePixExtra()
7140: dfMultFill()
7148: fdPaga()
7149: dfMultRender()
7158: toggleMultas()
7165: addMulta()
7175: delMulta()
7183: multaPaga()
7192: renderDriverExtras()
7220: mondayAfter()
7228: renderDriverProfileExtras()
7294: semanaDoPix()
7300: **MEUS RECIBOS (área do motorista)**
7302: meusRecibosLista()
7306: reciboRowHtml()
7314: renderEncerradoRecibos()
7319: openMeuReciboDireto()
7320: openMeusRecibos()
7327: closeMeusRecibos()
7328: reciboPdfHtml()
7339: verMeuRecibo()
7346: voltarMeusRecibos()
7347: pdfMeuRecibo()
7351: shareMeuRecibo()
7360: **VALORES DA COBRANÇA: aluguel do carro + acréscimo − desconto**
7361: editVehicleRent()
7378: nextParcel()
7384: fillNewPixValues()
7420: newPixParts()
7451: **PERÍODO E VENCIMENTO DA COBRANÇA**
7452: dataISO()
7453: dataDe()
7454: dataMais()
7455: dataBR()
7456: diasEntre()
7457: isoSP()
7458: pixPeriodo()
7465: pixDesc()
7466: pixDiasPeriodo()
7471: marcarAjustesPorVenc()
7476: pixDatasNovo()
7485: pixDatasMudou()
7496: pixAluguelProporcional()
7504: pixPeriodoInfo()
7517: pixAddLinha()
7524: pixLinhas()
7526: descSoma()
7536: calcNewPix()
7545: **RECIBO DE PAGAMENTO**
7549: receiptValue()
7550: **COBRAR ATRASO: a IA escreve a mensagem de cobrança e abre na Área IA, pronta para enviar no WhatsApp**
7551: atrasoDados()
7555: cobrarAtraso()
7572: allocatePix()
7591: reciboData()
7614: fmtDateTimeBR()
7615: reciboTexto()
7666: openRecibo()
7683: closeRecibo()
7684: **CORRIGIR RECIBO**
7686: corrigirLinhaHtml()
7696: openCorrigirRecibo()
7719: closeCorrigirRecibo()
7720: corrigirLer()
7726: corrigirSoma()
7733: salvarCorrigirRecibo()
7750: copyRecibo()
7755: reciboCanvas()
7772: reciboPdfBlob()
7790: shareReciboPdf()
7806: rotularTabelas()
7824: areaAberta()
7825: markAreas()
7835: closeAreas()
7839: toggleArea()
7847: dobraSalva()
7848: setDobra()
7853: toggleDobra()
7860: dobraTopo()
7867: renderMasterResumo()
7881: renderMasterTopo()
7903: loadIA()
7925: updateIABadge()
7930: loadIASetting()
7936: paintIASwitch()
7942: toggleIA()
7949: loadRobo()
7958: iaPrepararQr()
7963: paintRobo()
7992: pedirCodigoRobo()
8001: toggleRobo()
8016: iaTodosGerar()
8034: iaTodosCancelar()
8038: iaTodosConfirmar()
8052: loadIARules()
8057: iaAbrirPdf()
8063: renderIARules()
8067: saveIARules()
8072: addIARule()
8077: delIARule()
8081: openIA()
8096: closeIA()
8097: iaShow()
8098: iaPhone()
8103: renderIA()
8145: iaAprovar()
8154: iaPhone2()
8155: iaSend()
8186: iaMark()
8197: iaDelete()
8208: openPixArea()
8217: closePixArea()
8218: renderPixArea()
8262: openEditPix()
8291: deletePix()
8303: closeNewPix()
8305: saveNewPix()
8396: pushSupported()
8397: isIOS()
8398: isStandalone()
8399: b64ToBytes()
8405: **NOTIFICAÇÕES OBRIGATÓRIAS PARA O MOTORISTA**
8410: notifStatus()
8418: stepsList()
8422: notifHelpHtml()
8456: renderNotifModal()
8468: checkDriverNotifications()
8501: activateFromModal()
8514: refreshNotifButton()
8533: subscribePush()
8548: enableNotifications()
8568: closeDocViewer()
8576: **FUNÇÕES DO MOTORISTA (o master liga e desliga em Configurações)**
8588: allFeaturesOn()
8589: feat()
8590: loadDriverFeatures()
8597: saveDriverFeatures()
8602: drawFeatureToggles()
8617: setAllFeatures()
8628: applyDriverFeatures()
8643: **PIX: conferência do código e QR code desenhado no aparelho**
8644: crc16()
8652: **PIX COPIA E COLA GERADO NO APARELHO (padrão BR Code do Banco Central, sem API de banco)**
8654: pixTxt()
8655: pixCampo()
8656: pixGerarCodigo()
8666: pixAutoLigado()
8667: pixAutoMudou()
8672: gerarPixAuto()
8688: pixRecebedorCarregar()
8699: pixRecebedorGuardar()
8706: pixValid()
8712: renderPixQr()
8722: previewNewPixQr()
8732: **FOTO DO MOTORISTA (recortada da CNH)**
8733: photoPath()
8734: fileToCanvas()
8753: cropPhoto()
8767: savePhoto()
8772: photoBoxFrom()
8778: fillAvatar()
8789: fillAvatars()
8802: storedFile()
8809: photoFromCnh()
8821: **FOTO DO PERFIL ACOMPANHA A CNH**
8824: cnhStamp()
8825: photoFiles()
8833: avatarPath()
8838: syncCnhPhotos()
8862: pickImage()
8865: changeDriverPhoto()
8881: **LEITURA AUTOMÁTICA DE DOCUMENTOS (IA)**
8883: uploadTmp()
8890: clearTmp()
8895: aiReadFiles()
8901: okDateISO()
8903: noAccents()
8905: makeUsername()
8914: titleCase()
8915: syncNewDriverAccess()
8921: setNewDriverPhoto()
8926: pickNewDriverPhoto()
8930: resetNewDriverForm()
8938: newDriverDocChosen()
8972: anoCrlv()
8976: formatVehicleBrand()
8981: inferVehicleBrand()
8990: normalizeCrlvFields()
9009: applyCrlvFields()
9022: aiReadCrlv()
9036: **E-MAIL E TELA COM USUÁRIO E SENHA DO MOTORISTA NOVO**
9037: sendWelcomeEmail()
9043: showCredentials()
9054: demoAssistente()
9073: **PERGUNTAR À IA (ÁREA IA, só o master)**
9077: iaChatReset()
9078: iaNorm()
9079: iaAcha()
9085: iaVeicTxt()
9086: iaCamposVeic()
9087: iaDataOk()
9088: iaOpcoes()
9089: iaTodosMotoristas()
9093: iaFerramenta()
9188: renderIAChat()
9205: iaChatDica()
9206: iaChatEnviar()
9241: iaChatNota()
9242: iaCancelarCartao()
9243: iaConfirmarCartao()
9288: **GANHOS APLICATIVO (Uber/99/inDrive) – só o master**
9289: syncAppFinState()
9298: renderAppEarnings()
9378: saveAppEarning()
9405: workDayISO()
9406: paintDayOff()
9415: renderDayOff()
9422: setDayOff()
9432: aiReadEarning()
9465: **DESPESAS DO APLICATIVO**
9467: appExpCustomTypes()
9468: fillAppExpTypes()
9475: onAppExpTypeChange()
9480: saveAppExpense()
9505: deleteAppExpense()
9514: deleteAppEarning()
9611: loadTermsAcceptances()
9623: termsOf()
9624: currentAcceptance()
9625: needsTermsAcceptance()
9628: fmtDateTime()
9631: termsPlainText()
9635: termsHash()
9643: openTermsGate()
9666: termsGateCheck()
9674: acceptTerms()
9694: acceptanceHtml()
9705: openTermsViewer()
9723: closeTerms()
9729: downloadTermsCopy()
9750: termsBadgeMaster()
9757: termsMasterDetail()
9798: renderTermsSetupBanner()
9811: copyTermsSql()
9821: cnhExpired()
9822: cnhWaiting()
9823: onlyDigits()
9824: normName()
9826: verifyCnh()
9838: renderCnhBanner()
9856: sendNewCnh()
9904: cnhBadgeMaster()
9912: applyPendingCnh()
9920: autoReadNewCnhs()
9938: cnhPendingHtml()
9952: recheckPendingCnh()
9962: rejectPendingCnh()
9972: showContractDoc()
10066: inspectPdfSignaturesBytes()
10085: readPdfFileAsBase64AndInspect()
10100: govBrSignersList()
10112: renderGovBrFlowBox()
10164: driverGovBrBlockHtml()
10193: govBrPublicAppBaseUrl()
10197: createGovBrInvite()
10229: submitMasterGovBrPdf()
10250: submitDriverGovBrPdf()
10269: loadGovBrInvitePage()
10340: submitGovBrInvitePdf()
10359: exitGovBrInviteToLogin()
10378: contractPeriodLabel()
10379: contractStatusBadge()
10383: pdfSafeText()
10395: contractPdfFileName()
10404: cwBuildDepositChargeText()
10443: cwBuildDepositClauseText()
10455: lcClauseStart()
10462: buildDefaultClauses()
10524: generateContractPdfBytes()
10543: drawHeader()
10548: newPage()
10555: ensureSpace()
10558: wrapLines()
10582: drawJustifiedLine()
10702: renderContractsTab()
10756: renderDriverRentalContractsBox()
10815: openContractForDriver()
10822: *WIZARD DE CRIAÇÃO / EDIÇÃO DE RASCUNHO / RENOVAÇÃO*
10824: closeContractWizard()
10825: cwPopulateSelects()
10833: cwPopulateLocadores()
10845: cwOnLocadorChange()
10854: defaultWitness1ForLocador()
10862: cwApplyDefaultWitness1()
10875: cwFillLocador()
10883: cwFillDepositFromDriver()
10911: cwFillDepositFromComercial()
10933: cwSyncClauseIdx()
10942: cwSyncDepositClauseOnly()
10943: cwUpdateTrialPreview()
10959: cwDepCalc()
11004: cwFillDriver()
11022: cwUpdateCrlvBar()
11031: cwNeedsCrlvFill()
11035: cwRefreshMissingBoxIfVisible()
11044: cwReadVehicleCrlv()
11093: cwReadCurrentVehicleCrlv()
11099: cwFillVehicle()
11121: cwOnDriverChange()
11129: cwOnVehicleChange()
11140: cwReadSnapshot()
11183: cwRenderClausesEditor()
11193: cwRebuildClauses()
11201: cwRenderPreview()
11231: cwTogglePreview()
11236: validateContractForEmission()
11253: openContractWizard()
11361: cwSyncSources()
11401: logContractHistory()
11410: persistContract()
11498: saveContractDraft()
11499: emitContract()
11501: ensureContractPdfBlob()
11512: downloadContractPdf()
11524: printContractPdf()
11537: *MODAL DETALHE, ASSINATURAS, UPLOAD ASSINADO, RENOVAR, ENCERRAR, CANCELAR*
11538: closeContractDetail()
11539: openContractDetail()
11609: saveContractSignatures()
11634: uploadSignedContractFile()
11654: terminateContractPrompt()
11669: cancelContractPrompt()
11709: inspectionTypeBadge()
11713: inspectionStatusBadge()
11717: inspectionPdfFileName()
11724: switchContractsSubtab()
11737: renderInspectionsTab()
11797: *ANALISADOR DE IA EM LOTE + CONFIRMAÇÃO PRESENCIAL DE DANOS*
11798: runInspectionBatchAI()
11821: promptInspectionDamageConfirmation()
11899: processInspectionPhotosWithAI()
11955: analyzeSavedInspectionPhotos()
11971: renameInspectionPhoto()
11987: *WIZARD DE TERMO DE VISTORIA (ENTREGA E DEVOLUÇÃO)*
11990: closeInspectionWizard()
11991: openInspectionWizard()
12058: iwCollectSavedPhotosFor()
12091: iwPopulateContractsAndBase()
12106: iwSyncHeaderAndLegal()
12118: iwOnTypeChange()
12124: iwOnVehicleChange()
12142: iwOnDriverChange()
12147: iwOnContractChange()
12154: iwImportSavedPhotos()
12165: iwUploadPhotos()
12218: iwRunAIOnList()
12244: iwAnalyzeWithAI()
12251: iwRenderPhotos()
12289: iwUpdatePhotoField()
12294: iwUpdatePhotoDamage()
12302: iwRemovePhoto()
12308: iwRenderDamagesSummary()
12323: iwRenderComparison()
12342: iwRenderChecklist()
12361: persistInspectionTerm()
12463: saveInspectionDraft()
12464: emitInspectionTerm()
12466: *GERADOR DE PDF A4 DE VISTORIA E DEVOLUÇÃO (com grid real de fotos)*
12467: blobToEmbeddableJpeg()
12496: generateInspectionPdfBytes()
12687: ensureInspectionPdfBlob()
12697: downloadInspectionPdf()
12709: printInspectionPdf()
12722: *MODAL DETALHE E ASSINATURAS DO TERMO DE VISTORIA*
12723: closeInspectionDetail()
12724: openInspectionDetail()
12781: saveInspectionSignatures()
12805: uploadSignedInspectionFile()
12825: cancelInspectionPrompt()

## sw.js (61 linhas)

(sem itens)

## robo-whatsapp/nucleo.js (784 linhas)

26: mascarar()
29: numeroBR()
35: empacotar()
45: credsValido()
50: abrirPacote()
64: abrirConteudo()
74: textoDe()
83: contatoOculto()
86: novoIdRobo()
87: ehDoRobo()
90: numeroDoJid()
92: soBrasil()
95: organizarPix()
102: criarRobo()
105: hora()
106: log()
116: pareado()
117: limparLocal()
119: motoraBruto()
130: motora()
136: avisarErroPareamento()
138: *conexão guardada no Supabase*
139: existeGuardada()
140: restaurar()
174: guardar()
202: agendarBackup()
208: *conexão com o WhatsApp*
209: agendarAbrir()
214: backoff()
219: falhaAoAbrir()
221: soltarSocket()
228: abrir()
259: *conversa que já existia (pedido do dono, 04/11/2026)*
263: aoHistorico()
271: conversaAntiga()
283: aoMudar()
312: esquecerConexao()
318: aoCair()
334: reabrirQr()
359: *conectar pelo número*
360: verificarPareamento()
401: *fila de envio*
403: mandar()
414: conteudoDe()
421: enviar()
438: enviarCopias()
460: marcarEnviada()
467: verReinicio()
478: sinalDeVida()
491: ciclo()
526: *mensagens recebidas (comprovante de motorista e resposta do dono)*
529: aoReceber()
536: telefoneDe()
545: avisarArquivoSemNumero()
552: comRepeticao()
560: responder()
565: tratarRecebida()
622: *atendimento de número desconhecido (saudação, aviso à Dara e conversa intermediada)*
624: destino()
632: encaminhar()
637: ouvirDono()
649: entregarAtendimento()
674: pessoaRespondeu()
687: chamarDara()
710: cicloAtendimento()
715: receberArquivo()
734: *página do QR*
735: pagina()
749: *laços*
750: repetir()
757: iniciar()
768: encerrar()

## robo-whatsapp/robo.js (28 linhas)

(sem itens)

## supabase/functions/motora-asaas/index.ts (656 linhas)

22: serviceKey()
29: json()
31: brl()
32: r2()
36: secret()
41: asaas()
54: avisar()
64: hojeBR()
65: proximoDia()
72: proximaParcela()
83: cauParcela()
92: ajusteVale()
95: tirarAjustes()
103: getAtrasoConfig()
107: atrasoDataBR()
112: atrasoPrazoUtil()
119: calcEncargosAtraso()
137: ehLinhaEncargo()
139: cobrarMotorista()
152: *valores (mesma regra do Novo Pix)*
180: *QR code Pix estático com o valor da semana (sem taxa até 100 Pix/mês)*
183: *atualiza o motorista (o banco cria o histórico e a data de pagamento sozinho)*
204: criarQrAsaasEUpload()
227: saldoAbertoMotorista()
287: salvarQrParcialNoPerfil()
298: atualizarQrAtrasoMotorista()
332: cobrarTodos()
363: *pagamento recebido*
364: quemPagou()
387: pagamentoRecebido()
477: usuarioAuth()
486: ehMaster()
491: pixParcialMotorista()
550: autorizarParcial()
591: preparar()
592: limpa()
627: acao "pix_parcial"
630: acao "autorizar_parcial"
635: acao "preparar"
638: acao "atualizar_atraso"
649: acao "cobrar"

## supabase/functions/motora-assinatura/index.ts (475 linhas)

7: serviceKey()
27: json()
47: maskCpf()
53: inspectPdfSignatures()
77: makeToken()
84: resolveDoc()
91: publicDocSummary()
128: authUser()

## supabase/functions/motora-assistente/gemini.ts (49 linhas)

6: modelosGemini()

## supabase/functions/motora-assistente/index.ts (93 linhas)

7: serviceKey()
18: json()
20: secret()
24: ehMaster()
32: regrasDono()
38: s()
39: n()
52: instrucoes()

## supabase/functions/motora-backup/index.ts (99 linhas)

10: serviceKey()
16: json()
24: secret()
29: lerTabela()

## supabase/functions/motora-codigo/index.ts (113 linhas)

7: serviceKey()
13: json()
14: secret()
18: guarda()
22: gh()
27: shaArq()
28: textoEm()
29: b64()
33: aplica()
46: palavraCerta()

## supabase/functions/motora-dono/gemini.ts (49 linhas)

6: modelosGemini()

## supabase/functions/motora-dono/index.ts (471 linhas)

9: serviceKey()
15: json()
16: secret()
22: brl()
23: hoje()
24: diaBR()
25: fmtDia()
26: norm()
27: dataOk()
28: num()
29: veicTxt()
30: dig()
39: opcoes()
46: dados()
56: distribui()
66: soma()
69: formaPagar()
98: *as ferramentas: consultar_* respondem; propor_* devolvem {pedido} e nada é gravado aqui*
99: ferramenta()
102: carroDe()
103: umMotorista()
104: umCarro()
127: s()
168: pede()
242: mudaExtra()
247: falha()
248: executar()
292: s()
293: obj()
322: instrucoes()
339: lerDecisao()
341: aparar()
346: salvar()
349: atender()
412: *áudio: a IA ouve o dono e responde falando (sempre com modelos alternativos). A palavra secreta nunca vale por áudio*
413: transcreve()
418: fala()
435: mp3()

## supabase/functions/motora-lembretes/index.ts (367 linhas)

15: serviceKey()
21: json()
22: brl()
28: cauParcela()
37: ajusteVale()
40: tirarAjustes()
46: secret()
51: hojeBR()
52: diaBR()
53: proximoDia()
60: previsao()
74: formaAuto()
76: avisoDono()
101: avisoMotorista()
124: r2()
125: atrasoDataBR()
130: atrasoPrazoUtil()
137: calcEncargosAtraso()
155: ehLinhaEncargo()
158: emAberto()
181: avisoAtraso()
204: **4) PIX AUTOMÁTICO DO MOTORA**
206: crc16()
211: campo()
212: txtPix()
213: codigoPix()
220: chaveNormal()
227: proximaParcela()
235: pixAutomatico()
242: *valores (mesma regra do Novo Pix e do Asaas)*
269: *atualiza o motorista (o banco cria o histórico e a data de pagamento sozinho)*
290: pixAutoTodos()
314: enviar()
323: lembrar()

## supabase/functions/motora-ler-veiculos/gemini.ts (49 linhas)

6: modelosGemini()

## supabase/functions/motora-ler-veiculos/index.ts (58 linhas)

6: serviceKey()
12: json()
13: secret()
35: aceita()
43: norm()

## supabase/functions/motora-push/gemini.ts (49 linhas)

6: modelosGemini()

## supabase/functions/motora-push/index.ts (443 linhas)

12: serviceKey()
23: json()
25: secret()
31: vapid()
45: copiaWhatsAppDono()
55: sendTo()
75: masterIds()
80: fmtDue()
84: fmtDia()
87: safeUrl()
89: **ÁREA IA (mensagens de WhatsApp)**
90: brl()
92: pixKey()
99: setting()
103: iaAtiva()
105: roboFuncionando()
111: baseMessage()
115: textoNovoPix()
122: regrasDono()
127: lerMensagem()
136: iaEscreve()
153: iaReescreveTodos()
167: motoristasDoAviso()
173: reciboDados()
198: gerarPdfRecibo()
202: limpa()
222: queueWhatsApp()
247: norm()
270: **fim da Área IA**
276: textoBoasVindas()
300: sendToDriver()
313: type "public_key"
322: type "sunday"
330: type "recibo_teste"
334: type "master_alert"
338: type "driver_alert"
350: type "test"
358: type "aprovar_msg"
369: type "todos_rascunho"
377: type "todos_enviar"
387: type "new_pix"
399: type "boas_vindas"
414: type "cobranca"

## supabase/functions/motora-qr-asaas/index.ts (28 linhas)

5: serviceKey()
11: json()

## supabase/functions/motora-robo/comandos.ts (226 linhas)

3: chaveFone()
10: chaveContato()
18: lerComando()
23: norm()
27: escolher()
32: nomeNoInicio()
41: lista()
54: extensao()
63: *atendimento de número desconhecido*
64: foneBonito()
73: primeiroNome()
76: saudacao()
82: textoDara()
86: promptDara()
98: lerMensagemIA()
107: avisoDaraValido()
112: *a IA tira dúvidas de quem quer alugar, só com os dados do app*
114: reais()
116: ofertaVeiculo()
123: promptCliente()
138: lerRespostaCliente()
148: valoresConferem()
155: textoDaraSim()
159: lerDecisao()
165: promptResumo()
170: lerResumo()
178: *urgência da mensagem do motorista: quanto mais urgente, mais rápido chama a Dara*
184: nivelPorPalavras()
191: promptNivel()
201: lerNivel()
210: textoDaraMotorista()
216: escolherConversa()

## supabase/functions/motora-robo/gemini.ts (49 linhas)

6: modelosGemini()

## supabase/functions/motora-robo/index.ts (461 linhas)

15: serviceKey()
21: json()
24: secret()
29: ehDono()
34: motoristaDoFone()
43: nivelDaMensagem()
56: resumoDe()
67: respostaCliente()
80: aceita()
86: falaCliente()
92: avisoDara()
96: aceita()
110: acao "pendentes"
121: conta()
148: acao "freio"
158: acao "enviada"
164: acao "falhou"
176: *mensagens RECEBIDAS: só valem com o envio automático ligado*
179: *número desconhecido: saúda, em 3 min sem resposta chama a Dara e intermedia a conversa*
181: rotulo()
182: acao "atendimento"
305: acao "audio_dono"
310: acao "locadora_respondeu"
316: acao "atendimento_fila"
347: acao "atendimento_ok"
356: acao "atendimento_falhou"
361: acao "mensagem"
385: acao "comprovante_url"
404: acao "comprovante_salvar"
414: acao "comprovante_sem_numero"
419: acao "qr"
426: acao "parear_ver"
430: acao "parear_codigo"
437: acao "sessao_existe"
441: acao "sessao_enviar"
446: acao "sessao_baixar"
451: acao "sessao_apagar"

## supabase/functions/motora-sync/index.ts (573 linhas)

5: serviceKey()
17: json()
19: secret()
24: readFile()
33: drive()
42: stamp()
44: driverInfo()
50: syncDoc()
58: uploadReceipt()
66: syncPix()
78: syncExpense()
91: *DOCUMENTOS DO VEÍCULO, VISTORIA E TERMOS (envio automático ao Drive)*
92: vehicleInfo()
98: syncVehicleDoc()
105: syncInspection()
113: escHtml()
114: syncTerms()
129: *fim*
131: *E-MAIL: a IA escreve, o dono confere no app e confirma o envio*
132: regrasDono()
137: emailDraft()
155: sendEmail()
163: *fim do e-mail*
165: **LEITURA DE DOCUMENTOS E VISTORIA COM IA (Gemini)**
168: modelosGemini()
184: callGemini()
238: expensePrompt()
246: earningPrompt()
258: callGeminiDriver()
260: aiReadFiles()
273: aiAnalyzeInspection()
314: driverWelcome()
329: *CONFERÊNCIA DE COMPROVANTE COM IA*
336: geminiOnFiles()
346: nameWords()
350: brl()
351: dBR()
353: pushAlert()
362: notifyMasters()
363: notifyDriver()
365: verifyReceipt()
372: save()
421: checkDriverCnh()
436: dig()
457: driverCnhCheck()
467: dig()
492: aiRead()
514: type "doc"
515: type "receipt"
516: type "pix"
517: type "expense"
518: type "vehicle_doc"
519: type "inspection"
520: type "terms"
521: type "verify_receipt"
522: type "driver_cnh"
531: type "driver_cnh_check"
534: type "ai_read"
535: type "verify_receipt"
536: type "ai_read_files"
541: type "ai_analyze_inspection"
546: type "driver_welcome"
547: type "email_draft"
548: type "send_email"
550: type "drive_ping"
551: type "drive_resync"

## SQL aplicado no Supabase (supabase/*.sql)

- supabase/2026-11-01-novidades.sql: MOTORA — novidades de 01/11/2026 (APLICADO em 02/11/2026)
- supabase/2026-11-02-asaas-config.sql: MOTORA — 02/11/2026 (APLICADO em 02/11/2026)
- supabase/2026-11-02-periodo-cobranca.sql: MOTORA — período, vencimento e correção de recibo por cobrança (02/11/2026)
- supabase/2026-11-03-atendimento.sql: Atendimento de número desconhecido pelo robô (só o robô usa, pela função motora-robo)
- supabase/2026-11-03-atraso.sql: MOTORA — 03/11/2026 (APLICADO)
- supabase/2026-11-03-checa-robo.sql: Checagem do robô a cada 30 s: avisa o dono uma vez quando para e outra quando volta
- supabase/2026-11-03-devolucao-aprovar.sql: Depois do botão de devolução, nenhuma mensagem sai para o motorista sem a aprovação do dono
- supabase/2026-11-03-dono-assistente.sql: Conversa do dono com a IA pelo WhatsApp e o pedido que espera o SIM. Só as funções do servidor leem e gravam.
- supabase/2026-11-03-ia-codigo.sql: Palavra secreta e chave do GitHub da IA do dono: só o master grava; ninguém lê pelo app. A palavra fica só como resumo (hash).
- supabase/2026-11-03-ia-ganhos-app.sql: A IA do WhatsApp (motora-dono) grava ganhos e despesas de aplicativo depois do SIM do dono
- supabase/2026-11-03-lembretes.sql: MOTORA — 03/11/2026 (APLICADO em 03/11/2026)
- supabase/2026-11-03-whatsapp-dono.sql: WhatsApp do dono: avisos do master no número dele e confirmação de comprovante por resposta.
- supabase/2026-11-04-ar-avisos-grafico.sql: Ar-condicionado: histórico do quarto (gráfico) e avisos no celular. Só mexe na área "ar".
- supabase/2026-11-04-ar-condicionado.sql: Ar-condicionado (Gree ESP32): área isolada "ar" no projeto motora. Não toca nas tabelas do MOTORA.
- supabase/2026-11-04-conversa-antiga.sql: Conversa que já existia (04/11/2026, já aplicado): número que não é motorista e já conversava com a locadora
- supabase/2026-11-04-pix-automatico.sql: Pix automático do MOTORA e lembrete do meio-dia (já aplicado em 04/11/2026)
- supabase/2026-11-10-qr-asaas-whatsapp.sql: Mensagem de Pix de motorista no Asaas leva a imagem do QR code criada pelo Asaas (10/11/2026). Já aplicado no banco.
- supabase/2026-11-10-remove-picpay.sql: PicPay retirado do MOTORA (10/11/2026). Já aplicado no banco.
- supabase/2026-11-10-seguranca.sql: Segurança (10/11/2026). Já aplicado no banco.
- supabase/2026-11-12-atraso-juros-asaas.sql: MOTORA — 12/11/2026: Juros e multa por inadimplência alinhados ao Asaas (10% multa + 2% ao mês pro rata die, QR estático sem tarifa)
- supabase/2026-11-12-caucao-valor-contrato.sql: Inclui o valor pago de caução no encerramento de contrato e na mensagem ao motorista
- supabase/2026-11-12-contrato-caucao-arquivo.sql: Contagem de 30 dias da caução após encerramento do contrato + "Caução pago" e arquivamento da ficha
- supabase/2026-11-12-contrato-parcial-financeiro.sql: MOTORA: vincula histórico de Pix ao veículo, adiciona encerramento de contrato e atualização segura de QR parcial (Asaas)
- supabase/2026-11-12-modulo-contratos.sql: Módulo de Contratos de Locação (12/11/2026)
- supabase/2026-11-12-modulo-vistorias.sql: Módulo Unificado de Vistorias Veiculares e Devolução com IA (12/11/2026)
- supabase/2026-11-13-govbr-assinaturas.sql: Fluxo oficial de assinaturas eletrônicas via Portal GOV.BR (assinador.iti.br)
